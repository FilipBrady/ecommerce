import { Box, Button, TextField } from '@mui/material';
// import products from '../../data/Products.json';
import ProductCard from '../../pages/ProductCard';
import { useState } from 'react';
import { useAppContainer } from '../Context';
const ProductSection = () => {
  const { products, categories } = useAppContainer();
  const [categoryId, setCategoryId] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const isInCategory = categoryId === 0 || product.categoryId === categoryId;
    const isInSearch =
      searchTerm === '' ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return isInCategory && isInSearch;
  });
  return (
    <Box
      sx={{
        // margin: '0px 5px',
        background: '#dbdbdb',
        padding: '15px 5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'left',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'baseline',
        }}
      >
        <TextField
          variant='outlined'
          type='text'
          // onClick={() => setCategoryId(0)}
          value={searchTerm}
          onChange={val => setSearchTerm(val.target.value)}
        />
        <Button
          variant='text'
          sx={{ margin: '0 4px' }}
          onClick={() => setCategoryId(0)}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            variant='text'
            sx={{ margin: '0 4px' }}
            onClick={() => setCategoryId(category.id)}
          >
            {category.categoryTitle}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
          gap: 3,
          margin: '10px 5px',
          padding: '15px 5px',
        }}
      >
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};
export default ProductSection;
