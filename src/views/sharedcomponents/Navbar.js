import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import SearchBar from '../sharedcomponents/SearchBar';

// react icans
import { GiHamburgerMenu } from 'react-icons/gi';

// material ui
import Typography from '@material-ui/core/Typography';

// css imports
import './Navbar.scss';

// react icons
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar({ sideBarHandlerTrue }) {
  const { isLogged, user } = useSelector((state) => state.auth);
  const [hideSearchBar, setHideSearchBar] = useState(window.width <= 900);

  useEffect(() => {
    const startup = () => {
      const checkScreenSize900 = () => {
        window.innerWidth <= 900
          ? setHideSearchBar(true)
          : setHideSearchBar(false);
      };
      window.addEventListener('resize', checkScreenSize900);
      checkScreenSize900();

      return () => window.removeEventListener('resize', checkScreenSize900);
    };

    startup();
  }, []);

  return (
    <div className='Navbar_container'>
      <GiHamburgerMenu className='Navbar__menu' onClick={sideBarHandlerTrue} />

      <div className='Navbar__rightside'>
        <SearchBar hide={hideSearchBar} />
        {isLogged ? (
          <Typography
            component='div'
            variant='body2'
            className='Navbar__user-account'
          >
            <FaUserCircle className='Navbar__avatar' />
            {user.email}
          </Typography>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
