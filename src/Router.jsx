import { createBrowserRouter } from 'react-router-dom';
import { Home, Root } from './Pages';
import Talents from './components/Talents/Talents';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/talents',
        element: <Talents />,
      },
    ],
  },
]);
