import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, NavBar, TopNav } from '../../components';
const Root = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return (
    <>
      <TopNav />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
