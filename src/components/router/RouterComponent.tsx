import { Route, Routes } from 'react-router-dom';
import { routes } from '../../data/routes';
import ProductDetails from '../../pages/ProductDetails';
import App from '../../App';
import ProductSection from '../productSection/ProductSection';

const RouterComponent = () => {
  return (
    <Routes>
      <Route path={`${routes.home}`} element={<ProductSection />} />
      <Route path={`${routes.product}/:id`} element={<ProductDetails />} />
    </Routes>
  );
};
export default RouterComponent;
