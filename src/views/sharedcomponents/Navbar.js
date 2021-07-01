import React from 'react';

// react icans
import { GiHamburgerMenu } from 'react-icons/gi';

// css imports
import './Navbar.scss';

export default function Navbar({ sideBarHandlerTrue }) {
  return (
    <div className='Navbar_container'>
      <GiHamburgerMenu className='Navbar__menu' onClick={sideBarHandlerTrue} />
    </div>
  );
}
