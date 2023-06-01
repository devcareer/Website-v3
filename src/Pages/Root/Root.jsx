import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Nav } from '../../components';
const Root = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
