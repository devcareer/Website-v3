import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, NavBar } from '../../components';
const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
