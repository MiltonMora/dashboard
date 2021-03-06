import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

//import AppContext from '../context/AppContext';

import '../styles/components/Header.css';

const Header = () => {
  //const {state: {cart}} = useContext(AppContext);
  return (
    <div className="header">
      <Link to="/">
        <h1 className="header-title">Merch</h1>
      </Link>
      <div className="header-checkout">
        <Link to="/checkout">checkout</Link>
      </div>
    </div>
  );
};

export default Header;
