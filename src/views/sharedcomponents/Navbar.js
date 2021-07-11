import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// components
// import SearchBar from '../sharedcomponents/SearchBar';

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

  useEffect(() => {
    const startup = () => {};

    startup();
  }, []);

  return (
    <div className='Navbar_container'>
      <GiHamburgerMenu className='Navbar__menu' onClick={sideBarHandlerTrue} />

      <div className='Navbar__rightside'>
        {isLogged ? (
          <Typography
            component='div'
            variant='body2'
            className='Navbar__user-account'
          >
            <FaUserCircle className='Navbar__avatar' />
            {user?.email ?? (
              <div
                style={{
                  height: '11px',
                  width: '30px',
                  backgroundColor: 'blue',
                }}
              ></div>
            )}
          </Typography>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

// const [hideSearchBar, setHideSearchBar] = useState(window.width <= 900);

// const checkScreenSize900 = () => {

//   window.innerWidth <= 900

//     ? setHideSearchBar(true)

//     : setHideSearchBar(false);

// };

// window.addEventListener('resize', checkScreenSize900);

// checkScreenSize900();

// return () => window.removeEventListener('resize', checkScreenSize900);

{
  /* <SearchBar hide={hideSearchBar} /> */
}
