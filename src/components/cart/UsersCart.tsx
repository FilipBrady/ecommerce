import { DocumentData } from 'firebase/firestore';
import { useAppContainer } from '../Context';
import ProductCard from '../products/ProductCard';

type Props = {
  carts: DocumentData;
};
const UsersCart = ({ carts }: Props) => {
  const { auth, products } = useAppContainer();
  return (
    <div>
      <div>{carts.useruid}</div>
      <div>
        {carts.productsInCart.map((cartProduct: any) => {
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
                  {/* <ProductCard product={product} /> */}
                </div>
              );
            }
          });
        })}
      </div>
    </div>
  );
};
export default UsersCart;
