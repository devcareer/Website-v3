import { createBrowserRouter } from 'react-router-dom';
import { AuthRoot } from './Auth';
import ProtectedRoute from './Auth/PrivateRoute/ProtectedRoute';
import {
  AboutUs,
  ContactUs,
  Dctp,
  DpdsRegistration,
  FreeProfile,
  Home,
  LaptopForDevelopers,
  ProfileRoot,
  Root,
  Support,
  Talents,
  Error,
  PageNotFound
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
        path: 'contactunavailable',
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
    // element: <ProfileRoot />,
    element: (
      <ProtectedRoute>
        <ProfileRoot />
      </ProtectedRoute>
    ),
  },

  { path: 'programs/dpds/registration', element: <DpdsRegistration /> },
  { path: '/profile/:id', element: <FreeProfile /> },
  { path: '/error', element: <Error /> },
  { path: '*', element: <PageNotFound /> },

]);
