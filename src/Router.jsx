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
  AccountSettings,
  EditProfile,
} from './Pages';
import { ForgetPassword } from './Auth';

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
    path: '/profile',
    children: [
      {
        path: 'forgetpassword',
        element: <ForgetPassword />,
      },
      {
        path: 'settings',
        element: <AccountSettings />,
      },
      {
        path: 'edit',
        element: <EditProfile />,
      },
    ],
  },
  { path: 'programs/dpds/registration', element: <DpdsRegistration /> },
]);
