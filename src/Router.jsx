import { createBrowserRouter } from 'react-router-dom';
import { Home, Root } from './Pages';
import Dpds from './Pages/Dpds/Dpds';
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
    ],
  },
]);
