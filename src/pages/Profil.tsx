import { Box, Button } from '@mui/material';
import { useAppContainer } from '../components/Context';
import ProductCard from '../components/products/ProductCard';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/routes';
import UsersCart from '../components/cart/UsersCart';

const Profil = () => {
  const { userInfo, auth, products, carts } = useAppContainer();
  const navigate = useNavigate();
  return (
    <div>
      {userInfo?.map(user => {
        if (user.uid === auth.currentUser?.uid) {
          return (
            <div key={user.uid}>
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
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          }
        })}
      </Box>
      <div>Your Orders</div>
      {/* <div>
        {carts &&
          carts.map(cart => (
            <div key={cart.useruid}>
              {cart.productsInCart.map((cartProduct: any) => {
                products?.map(product => {
                  
                  if (product.id === cartProduct.productId) {
                      console.log(product.title + ' title');
                  console.log(product.id + ' id');
                  console.log(cartProduct.productId + ' id');
                  console.log(cartProduct.productAmount + ' amount');
                  return (
                    <div key={product.id}>
                      <div>{product.title}</div>
                      <div>{product.id}</div>
                      <div>{cartProduct.productId}</div>
                      <div>{cartProduct.productAmount}</div>
                      <ProductCard product={product} />
                    </div>
                  );
                }
                  });
              })}
            </div>
          ))}
      </div> */}
      {/* <div>
        {carts?.map(carts => (
          <div key={carts.useruid}>
            <UsersCart carts={carts} />
          </div>
        ))}
      </div> */}
    </div>
  );
};
export default Profil;
