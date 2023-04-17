import { useState } from 'react';
import { useAppContainer } from '../Context';
import './AddProduct.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../data/routes';

const AddProduct = () => {
  const { user, userInfo, auth, categories, addProduct } = useAppContainer();
  const [uploadedImg, setUploadedImg] = useState<Blob>();
  const [productDescription, setProductDescription] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState('');
  const [productCategoryId, setProductCategoryId] = useState(0);
  const navigate = useNavigate();

  const handleFileUpload = (e: any) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setUploadedImg(file);
      console.log(URL.createObjectURL(file));
    }
  };

  const handleProductFormSubmit = (e: any) => {
    e.preventDefault();
    if (
      auth.currentUser &&
      productDescription !== '' &&
      uploadedImg !== undefined &&
      productTitle !== '' &&
      productPrice !== 0 &&
      productCategory !== ''
    ) {
      addProduct(
        auth.currentUser?.uid,
        productTitle,
        productPrice,
        productDescription,
        productCategory,
        productCategoryId,
        uploadedImg
      );
      setProductTitle('');
      setProductPrice(0);
      setProductCategory('');
      setProductCategoryId(0);
      setProductDescription('');
      setUploadedImg(undefined);
      navigate(routes.profil);
    }
  };
  return (
    <div
      style={{
        background: 'rgb(112, 112, 228)',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div>AddPostPage</div>
      <Box
        sx={{
          background: 'white',
          width: 'fit-content',
          margin: 'auto',
          padding: 3,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-75%)',
          borderRadius: '25px',
          boxShadow: '8px 8px 12px -1px rgba(0,0,0,0.45)',
        }}
      >
        <form onSubmit={handleProductFormSubmit} className='AddProductForm'>
          <input
            type='text'
            placeholder='Product Title'
            value={productTitle}
            onChange={text => setProductTitle(text.target.value)}
          />
          <input
            type='number'
            value={productPrice}
            placeholder='Product Price in €'
            onChange={text => setProductPrice(text.target.valueAsNumber)}
          />
          <select
            onChange={text => {
              setProductCategory(
                text.target.options[text.target.selectedIndex].text
              );
              setProductCategoryId(parseInt(text.target.value));
            }}
          >
            <option placeholder='Choode Product Category' value={0}>
              Choode Product Category
            </option>
            {categories?.map(category => (
              <option
                key={category.id}
                value={category.id}
                placeholder={category.categoryTitle}
              >
                {category.categoryTitle}
              </option>
            ))}
          </select>
          <input type='file' onChange={handleFileUpload} />
          <textarea
            cols={30}
            rows={5}
            placeholder='description'
            value={productDescription}
            onChange={text => setProductDescription(text.target.value)}
          />
          <input type='submit' />
        </form>
      </Box>
    </div>
  );
};
export default AddProduct;
