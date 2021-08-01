import React from 'react';
// react-router
import { Link, useHistory, Redirect } from 'react-router-dom';
import './Sidebar.scss';

// custom services
import { logout } from '../../services/user.services';

// react redux
import { useDispatch, useSelector } from 'react-redux';

// actions from redux
import { logoutUser } from '../../redux/Auth/authActions';

//icons
import { RiHome7Line } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';
import { VscGraph } from 'react-icons/vsc';
import { GoReport } from 'react-icons/go';
import { CgLogOut } from 'react-icons/cg';

// logo
import { ReactComponent as Logo } from '../../images/justlogowithcompanyname.svg';

export default function Sidebar({ showSideBar, sideBarHandlerFalse }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  const logoutClick = async () => {
    sideBarHandlerFalse();
    await logout();
    dispatch(logoutUser());
  };

  if (!isLogged) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={`SideBar__container ${showSideBar ? 'ShowSideBar' : ''}`}>
      <GrClose
        className='Cancel__Button SideBar__icons'
        onClick={sideBarHandlerFalse}
      />
      <Logo className='Sidebar__logo' />
      <ul className='SideBar__tab-container'>
        <Link to='/dashboard' onClick={sideBarHandlerFalse}>
          <li
            className={`SideBar__tab ${
              history.location.pathname === '/dashboard' && 'Selected'
            }   `}
          >
            {' '}
            <RiHome7Line className='SideBar__icons' />
            Dashboard
          </li>
        </Link>
        <Link to='/project' onClick={sideBarHandlerFalse}>
          <li
            className={`SideBar__tab ${
              history.location.pathname === '/project' && 'Selected'
            }  `}
          >
            <VscGraph className='SideBar__icons' />
            Project
          </li>
        </Link>
        <Link to='/log' onClick={sideBarHandlerFalse}>
          <li
            className={`SideBar__tab ${
              history.location.pathname === '/log' && 'Selected'
            }  `}
          >
            <GoReport className='SideBar__icons' />
            Logs
          </li>
        </Link>
      </ul>

      <div className='Sidebar__Logout-container' onClick={logoutClick}>
        <CgLogOut className='SideBar__icons' /> Logout
      </div>
    </div>
  );
}
