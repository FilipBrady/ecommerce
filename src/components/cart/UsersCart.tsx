import { DocumentData } from 'firebase/firestore';
import { useAppContainer } from '../Context';
import ProductCard from '../products/ProductCard';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductInCart from './ProductInCart';

type Props = {
  carts: DocumentData;
};
const UsersCart = ({ carts }: Props) => {
  const { auth, products } = useAppContainer();
  // const [cartProducts, setCartProducts] = useState<any>();
  // const [allProducts, setAllProducts] = useState<any>();
  // useEffect(() => {
  //   setCartProducts(carts.productsInCart);
  //   setAllProducts(products);
  // }, []);

  return (
    <div>
      <Box sx={{margin: "0 auto", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "15px"}}>
        {carts?.productsInCart.map((cartProduct: any) => (
          <div>
            {products?.map((product: any) => {
              if (product.id === cartProduct.productId) {
                return (
                  <div>
                    <ProductInCart product={product} cartProduct={cartProduct} />
                  </div>
                );
              }
            })}
          </div>
        ))}
      </Box>
    </div>
  );
};
export default UsersCart;
