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
        path:"profile",
        children:[
          {
            path:'forgetpassword',
            element:<ForgetPassword />
          }
        ]
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
