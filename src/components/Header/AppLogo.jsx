import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to='/'>
      <img className='mb-3' src={Logo} alt='App logo' />
    </Link>
  );
};

export default AppLogo;
