import React from 'react';

import './Header.css'
const Header = () => {
  return <div>
      <header onClick={()=>window.scrollTo(0,0)} className='header'>
          Trailers Spot
      </header>
  </div>;
};

export default Header;
