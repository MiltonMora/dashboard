import React from 'react';

//import Products from '../components/Products';
//import initialState from '../initialState';

import '../styles/components/Home.css';

const Home = () => {
  return (
    <div className="container-home">
      <div className="container-getin">
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="email" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="password" />
        </div>
        <button type="submit" className="btn btn-primary">Get in</button>
      </div>
    </div>
  );
};
export default Home;
