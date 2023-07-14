import { createBrowserRouter } from 'react-router-dom';
import {
  Dctp,
  Home,
  AboutUs,
  LaptopForDevelopers,
  Root,
  Support,
  Talents,
  ContactUs,
  DpdsRegistration,
  ProfileRoot,
} from './Pages';
import { AuthRoot } from './Auth';

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
            path: 'l4d',
            element: <LaptopForDevelopers />,
          },
        ],
      },
      {
        path: 'government',
        children: [
          {
            path: 'dctp',
            element: <Dctp />,
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
  {
    path: 'auth',
    element: <AuthRoot />,
  },
  {
    path: 'profile',
    element: <ProfileRoot />,
  },

  { path: 'programs/dpds/registration', element: <DpdsRegistration /> },
]);
