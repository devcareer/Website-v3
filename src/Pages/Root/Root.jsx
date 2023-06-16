import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, NavBar } from '../../components';
const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(pathname)
  }, [pathname]);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
