import { createBrowserRouter } from 'react-router-dom';
import {
  Dpds,
  Home,
  AboutUs,
  LaptopForDevelopers,
  Root,
  Support,
  Talents,
  ContactUs,
  DpdsRegistration,
} from './Pages';

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
          {
            path: 'l4d',
            element: <LaptopForDevelopers />,
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
      {
        path: 'about',
        element: <AboutUs />,
      },
      {
        path: 'contact',
        element: <ContactUs />,
      },
    ],
  },
  { path: 'programs/dpds/registration', element: <DpdsRegistration /> },
]);
