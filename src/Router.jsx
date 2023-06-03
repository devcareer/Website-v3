import { createBrowserRouter } from 'react-router-dom';
import { Dpds, Home, Root, Support, Talents } from './Pages';

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
        path: 'programs',
        children: [
          {
            path: 'dpds',
            element: <Dpds />,
          },
        ],
      },
      {
        path: 'community',
        children: [
          {
            path: 'talents',
            element: <Talents />,
          },
        ],
      },
      {
        path: '/support',
        element: <Support />,
      },
    ],
  },
]);
