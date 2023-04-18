import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import { routes } from '../../data/routes';
import { useAppContainer } from '../Context';
import { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
type Props = {
  product: DocumentData;
  cartProduct: any;
};
const ProductInCart = ({ product, cartProduct }: Props) => {
  const {
    auth,
    storage,
    addProductToCart,
    plusProductInCart,
    minusProductInCart,
    deleteProductFromCart,
  } = useAppContainer();
  const [imageUrl, setImageUrl] = useState('');

  if (product.image === undefined) {
    const pathReference = ref(storage, `${product.useruid}/${product.id}`);

    getDownloadURL(pathReference).then(url => {
      setImageUrl(url);
    });
  }

  const handleAddToCartBtn = () => {
    if (
      product.useruid !== auth.currentUser?.uid &&
      auth.currentUser?.uid !== undefined
    ) {
      addProductToCart(product.id, product.price, auth.currentUser.uid);
    } else {
      alert('This product is Yours');
    }
  };
  return (
    <Box>
      <Card sx={{ maxWidth: 300, width: 300, maxHeight: 200, height: 200 }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: '2% 0',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              to={`${routes.product}/${product.id}`}
              style={{
                textDecoration: 'none',
                color: 'black',
                height: '100%',
                display: 'flex',
              }}
            >
              {/* <Box sx={{width: "100%", height: "100%"}}> */}
              {product.image !== undefined ? (
                <CardMedia
                  component='img'
                  width='auto'
                  image={product.image}
                  alt={product.title}
                  sx={{
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    height: 'auto',
                    margin: 'auto',
                  }}
                />
              ) : (
                <CardMedia
                  component='img'
                  width='auto'
                  image={imageUrl}
                  alt={product.title}
                  sx={{
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    height: 'auto',
                    margin: 'auto',
                  }}
                />
              )}
              {/* </Box> */}
            </Link>
          </Box>
          <CardContent
            sx={{
              height: '100%',
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 16px',
              '&:last-child': { pb: 0 },
            }}
          >
            <Typography variant='body1'>
              {product.title.substring(0, 30)}...
            </Typography>
            <Typography variant='body1'>{cartProduct.productPrice}€</Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {cartProduct.productAmount <= 1 ? (
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => deleteProductFromCart(product.id)}
                >
                  8
                </Button>
              ) : (
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => minusProductInCart(product.id)}
                >
                  -
                </Button>
              )}
              <Typography variant='body2' sx={{ marginX: '5px' }}>
                {cartProduct.productAmount}
              </Typography>
              <Button
                size='small'
                variant='outlined'
                onClick={() => plusProductInCart(product.id)}
              >
                +
              </Button>
            </Box>

            <Button
              variant='contained'
              color='primary'
              sx={{
                width: 'fit-content',
                margin: '0 auto',
                marginBottom: '5px',
                marginTop: '5px',
              }}
              onClick={handleAddToCartBtn}
            >
              Cart
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};
export default ProductInCart;
