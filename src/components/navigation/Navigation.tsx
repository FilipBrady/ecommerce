import { Link } from 'react-router-dom';
import './Navigation.css';
import { routes } from '../../data/routes';
import Cart from '../cart/Cart';
import { useState } from 'react';
import { useAppContainer } from '../Context';
const Navigation = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { auth, signInWithGoogle } = useAppContainer();

  console.log(auth.currentUser);

  return (
    <div style={{ background: '#bdbdbd', padding: '5px 0' }}>
      <nav className='Navigation'>
        <Link to={routes.home} className='NavLink'>
          Home
        </Link>
        <Link to={routes.liked} className='NavLink'>
          Liked
        </Link>
        <Link to={routes.profil} className='NavLink'>
          Profil
        </Link>
        <div onClick={() => setIsCartVisible(!isCartVisible)}>Cart</div>
        {isCartVisible && <Cart setIsCartVisible={setIsCartVisible} />}
        {auth.currentUser ? (
          <button onClick={() => auth.signOut()}>Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle}>LogIn</button>
        )}
        {auth.currentUser && <div>Hello user</div>}
      </nav>
    </div>
  );
};
export default Navigation;
