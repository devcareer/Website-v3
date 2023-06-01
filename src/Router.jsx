import { createBrowserRouter } from 'react-router-dom';
import { Home, Root, AboutUs } from './Pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/about',
    element: <Root />,
    children: [
      {
        index: true,
        element: <AboutUs />,
      },
    ],
  },
]);
