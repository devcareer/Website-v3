import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components';
const Root = () => {
  return (
    <div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Root;
