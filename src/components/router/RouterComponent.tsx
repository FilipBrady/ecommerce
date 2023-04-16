import { Route, Routes } from 'react-router-dom';
import { routes } from '../../data/routes';
import ProductDetails from '../../pages/ProductDetails';
import App from '../../App';
import LogInPage from '../../pages/LogInPage';
import SignUpPage from '../../pages/SignUpPage';
import Profil from '../../pages/Profil';
import ProductSection from '../products/ProductSection';
import AddProduct from '../addProduct/AddProduct';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path={`${routes.home}`} element={<ProductSection />} />
      <Route path={`${routes.product}/:id`} element={<ProductDetails />} />
      <Route path={routes.profil} element={<Profil />} />
      <Route path={routes.logIn} element={<LogInPage />} />
      <Route path={routes.signUp} element={<SignUpPage />} />
      <Route
        path={`${routes.profil}/${routes.addProduct}`}
        element={<AddProduct />}
      />
    </Routes>
  );
};
export default RouterComponent;
