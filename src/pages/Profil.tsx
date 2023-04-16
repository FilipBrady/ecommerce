import { Box, Button } from '@mui/material';
import { useAppContainer } from '../components/Context';
import ProductCard from '../components/products/ProductCard';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/routes';

const Profil = () => {
  const { userInfo, auth, products } = useAppContainer();
  const navigate = useNavigate();
  return (
    <div>
      {userInfo?.map(user => {
        if (user.uid === auth.currentUser?.uid) {
          return (
            <div>
              <h4>Profil Info:</h4>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
          );
        }
      })}
      <Button
        sx={{ mt: 3 }}
        variant='outlined'
        onClick={() => navigate(`${routes.profil}/${routes.addProduct}`)}
      >
        Add Product
      </Button>
      <h4>Your products</h4>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {products?.map(product => {
          if (product.useruid === auth.currentUser?.uid) {
            return (
              <div>
                <ProductCard key={product.id} product={product} />
              </div>
            );
          }
        })}
      </Box>
      <div>Your Orders</div>
    </div>
  );
};
export default Profil;
