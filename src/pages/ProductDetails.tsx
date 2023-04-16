import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppContainer } from '../components/Context';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, storage } = useAppContainer();
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div>
      {products &&
        products.map(product => {
          if (product.image === undefined) {
            const pathReference = ref(
              storage,
              `${product.useruid}/${product.id}`
            );

            getDownloadURL(pathReference).then(url => {
              setImageUrl(url);
            });
          }
          if (product.id.toString() === id) {
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
                  <Typography variant='subtitle1'>
                    {product.category}
                  </Typography>
                  <Typography variant='h5' color='primary'>
                    {product.title}
                  </Typography>
                  <Typography variant='body2'>{product.description}</Typography>
                  <Typography variant='h5' color='error' fontWeight='bold'>
                    {product.price}€
                  </Typography>
                </Box>
              </Box>
            );
          }
        })}
    </div>
  );
};
export default ProductDetails;
