import { createBrowserRouter } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Registration from '../Registration/Registration';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Root from '../Root/Root';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';

const Router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <LogIn />,
      },
      {
        path: REGISTRATION_ROUTE,
        element: <Registration />,
      },
    ],
  },
]);
export default Router;