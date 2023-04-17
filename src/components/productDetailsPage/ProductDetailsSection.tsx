import { Box, Button, Typography } from '@mui/material';
import { DocumentData } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { useAppContainer } from '../Context';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../data/routes';

type Props = {
  product: DocumentData;
};

const ProductDetailsSection = ({ product }: Props) => {
  const { storage, auth, deleteProduct } = useAppContainer();
  const [imageUrl, setImageUrl] = useState('');
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const navigate = useNavigate();

  if (product.image === undefined) {
    const imagePathReference = ref(storage, `${product.useruid}/${product.id}`);

    getDownloadURL(imagePathReference).then(url => {
      setImageUrl(url);
    });
  }

  const handleDeleteFormSubmit = (submitting: any) => {
    submitting.preventDefault();
    if (auth.currentUser?.uid !== undefined && auth.currentUser?.uid !== null) {
      deleteProduct(auth.currentUser.uid, product.id);
      setDeleteInput('');
      navigate(routes.profil);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '15px',
        justifyContent: 'center',
      }}
      key={product.id}
    >
      <Box sx={{ margin: '0 auto' }}>
        {product.image !== undefined ? (
          <img
            alt={product.title}
            src={product.image}
            style={{ width: '250px', height: 'auto' }}
          />
        ) : (
          <img
            alt={product.title}
            src={imageUrl}
            style={{ width: '250px', height: 'auto' }}
          />
        )}
      </Box>
      <Box
        sx={{
          margin: '0 auto',
          marginTop: '15px',
          maxWidth: '350px',
        }}
      >
        {product.useruid === auth.currentUser?.uid ? (
          <Button
            variant='outlined'
            size='small'
            onClick={() => setIsDeletingProduct(true)}
          >
            Delete My Product
          </Button>
        ) : (
          ''
        )}
        <Typography variant='subtitle1'>{product.category}</Typography>
        <Typography variant='h5' color='primary'>
          {product.title}
        </Typography>
        <Typography variant='body2'>{product.description}</Typography>
        <Typography variant='h5' color='error' fontWeight='bold'>
          {product.price}€
        </Typography>
      </Box>
      {isDeletingProduct && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#bf87f3',
            width: '35%',
            height: '35%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              cursor: 'pointer',
              fontWeight: 'bolder',
            }}
            onClick={() => setIsDeletingProduct(false)}
          >
            X
          </Box>
          <Typography variant='h5' sx={{ mb: 2 }}>
            Do you really want to delete this Product?
          </Typography>
          <Typography variant='body1'>
            If yes, type <strong>DELETE</strong> and click Process
          </Typography>
          <form onSubmit={handleDeleteFormSubmit}>
            <input
              type='text'
              value={deleteInput}
              placeholder='Type DELETE here'
              onChange={text => setDeleteInput(text.target.value)}
            />
            <input
              type='submit'
              value='Delete my product'
              disabled={
                !deleteInput
                  .toLowerCase()
                  .includes('DELETE'.toLowerCase().trim())
              }
            />
          </form>
        </Box>
      )}
    </Box>
  );
};
export default ProductDetailsSection;
