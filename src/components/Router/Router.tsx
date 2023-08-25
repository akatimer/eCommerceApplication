import { createBrowserRouter } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Registration from '../Registration/Registration';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Root from '../Root/Root';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  PRODUCT_ROUTE,
} from '../../utils/constants';
import Catalog from '../Catalog/Catalog';
import MainInfo from '../MainInfo/MainInfo';
import DetailedProduct from '../DetailedProduct/DetailedProduct';

const Router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: HOME_ROUTE,
        element: <MainInfo />,
      },
      {
        path: LOGIN_ROUTE,
        element: <LogIn />,
      },
      {
        path: REGISTRATION_ROUTE,
        element: <Registration />,
      },
      {
        path: SHOP_ROUTE,
        element: <Catalog />,
      },
      {
        path: `${PRODUCT_ROUTE}/:id`,
        element: <DetailedProduct />,
      },
    ],
  },
]);
export default Router;
