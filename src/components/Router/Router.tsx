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
  PROFILE_ROUTE,
  CART_ROUTE,
  ABOUT_US,
} from '../../utils/constants';
import MainInfo from '../MainInfo/MainInfo';
import Catalog from '../Catalog/Catalog';
import Profile from '../Profile/Profile';
import DetailedProduct from '../DetailedProduct/DetailedProduct';
import Cart from '../Cart/Cart';
import AboutUs from '../AboutUs/AboutUs';

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
        children: [
          {
            path: `${SHOP_ROUTE}/:categoryId`,
            element: <Catalog />,
            children: [
              {
                path: `${SHOP_ROUTE}/:categoryId/:subcategoryId`,
                element: <Catalog />,
              },
            ],
          },
        ],
      },
      {
        path: PROFILE_ROUTE,
        element: <Profile />,
      },
      {
        path: `${PRODUCT_ROUTE}/:id`,
        element: <DetailedProduct />,
      },
      {
        path: `${CART_ROUTE}`,
        element: <Cart />,
      },
      {
        path: ABOUT_US,
        element: <AboutUs />,
      },
    ],
  },
]);
export default Router;
