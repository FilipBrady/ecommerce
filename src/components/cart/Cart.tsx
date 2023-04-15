import { Dispatch, SetStateAction } from 'react';
import './Cart.css';
type Props = {
  setIsCartVisible: Dispatch<SetStateAction<boolean>>;
};
const Cart = ({ setIsCartVisible }: Props) => {
  return (
    <div className='Cart'>
      <div onClick={() => setIsCartVisible(false)} className='CartClose'>X</div>
      <div>Cart</div>
    </div>
  );
};
export default Cart;
