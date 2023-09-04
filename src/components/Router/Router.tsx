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
} from '../../utils/constants';
import MainInfo from '../MainInfo/MainInfo';
import Catalog from '../Catalog/Catalog';
import Profile from '../Profile/Profile';
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
        children: [
          {
            path: `${SHOP_ROUTE}/kids`,
            element: <Catalog />,
            children: [
              {
                path: `${SHOP_ROUTE}/kids/accessories`,
                element: <Catalog />,
              },
              {
                path: `${SHOP_ROUTE}/kids/tops`,
                element: <Catalog />,
              },
              {
                path: `${SHOP_ROUTE}/kids/bottoms`,
                element: <Catalog />,
              },
              {
                path: `${SHOP_ROUTE}/kids/dresses`,
                element: <Catalog />,
              },
            ],
          },
          {
            path: `${SHOP_ROUTE}/women`,
            element: <Catalog />,
            children: [
              {
                path: `${SHOP_ROUTE}/women/accessories`,
                element: <Catalog />,
              },
              {
                path: `${SHOP_ROUTE}/women/tops`,
                element: <Catalog />,
              },
              {
                path: `${SHOP_ROUTE}/women/bottoms`,
                element: <Catalog />,
              },
              {
                path: `${SHOP_ROUTE}/women/dresses`,
                element: <Catalog />,
              },
            ],
          },
          {
            path: `${SHOP_ROUTE}/unisex`,
            element: <Catalog />,
            children: [
              {
                path: `${SHOP_ROUTE}/unisex/tops`,
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
    ],
  },
]);
export default Router;
