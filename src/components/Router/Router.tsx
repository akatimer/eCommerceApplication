import { createBrowserRouter } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Registration from '../Registration/Registration';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Root from '../Root/Root';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../../utils/constants';
import MainInfo from '../MainInfo/MainInfo';
import Catalog from '../Catalog/Catalog';
import Profile from '../Profile/Profile';

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
        path: PROFILE_ROUTE,
        element: <Profile />,
      },
    ],
  },
]);
export default Router;
