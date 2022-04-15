import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Header-component';

const Header = () => (
  <>
    <HeaderComponent />
    <Outlet />
  </>
);

export default Header;
