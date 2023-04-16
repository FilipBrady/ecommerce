import { Link } from 'react-router-dom';
import './Navigation.css';
import { routes } from '../../data/routes';
import Cart from '../cart/Cart';
import { useState } from 'react';
import { useAppContainer } from '../Context';
const Navigation = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { auth, signInWithGoogle } = useAppContainer();

  return (
    <div style={{ background: '#bdbdbd', padding: '5px 0' }}>
      <nav className='Navigation'>
        <Link to={routes.home} className='NavLink'>
          Home
        </Link>
        <Link to={routes.liked} className='NavLink'>
          Liked
        </Link>
        {auth.currentUser ? (
          <Link to={routes.profil} className='NavLink'>
            Your Profile
          </Link>
        ) : (
          <Link to={routes.logIn} className='NavLink'>
            Profil
          </Link>
        )}
        <div onClick={() => setIsCartVisible(!isCartVisible)}>Cart</div>
        {isCartVisible && <Cart setIsCartVisible={setIsCartVisible} />}
        {!auth.currentUser && (
          <button>
            <Link
              to={routes.logIn}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              Log In
            </Link>
          </button>
        )}
        {auth.currentUser && (
          <button style={{ margin: '1px' }} onClick={() => auth.signOut()}>
            Sign Out
          </button>
        )}
      </nav>
    </div>
  );
};
export default Navigation;
