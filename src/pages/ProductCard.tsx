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
import { routes } from '../data/routes';
import { useAppContainer } from '../components/Context';
type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    categoryId: number;
    image: string;
    rating: { rate: number; count: number };
  };
};
const ProductCard = ({ product }: Props) => {
  const { auth } = useAppContainer();
  return (
    <Box>
      <Link to={`${routes.product}/${product.id}`} style={{textDecoration: "none", color: "black"}}>
      <Card sx={{ maxWidth: 250, width: 250, maxHeight: 400, height: 400 }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2% 0',
          }}
        >
          <Box
            sx={{
              height: '60%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
          </Box>
          <CardContent
            sx={{
              height: '36%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
            }}
          >
            <Typography variant='body1'>
              {product.title.substring(0, 20)}...
            </Typography>

            <Button
              variant='contained'
              color='primary'
              sx={{
                width: 'fit-content',
                margin: '0 auto',
                marginBottom: '5px',
                marginTop: '5px',
              }}
            >
              Cart
            </Button>
          </CardContent>
        </Box>
      </Card>
      </Link>
    </Box>
  );
};
export default ProductCard;
