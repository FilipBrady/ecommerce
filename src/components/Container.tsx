import { useState } from 'react';
import { Provider } from './Context';
import { Products } from '../data/Products';
import { Categories } from '../data/Categories';
import { CategoryTypes, ProductTypes } from '../data/types';



export type AppState = {
  products: ProductTypes;
  categories: CategoryTypes;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};

const Container = ({ children }: Props) => {
  const [productsList, setProductsList] = useState<ProductTypes>(Products);
  const [categoriesList, setCategoriesList] =
    useState<CategoryTypes>(Categories);

  const appState: AppState = {
    products: productsList,
    categories: categoriesList,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
