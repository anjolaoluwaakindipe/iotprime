import React, { useState } from 'react';

// installed packages
import { Route } from 'react-router-dom';

// css
import './MainLayout.scss';

// custom packages
import Navbar from '../sharedcomponents/Navbar';
import Sidebar from '../sharedcomponents/Sidebar';

export default function MainLayout({ exact, path, component: Component }) {
  const [showSideBar, setShowSideBar] = useState(false);

  const sideBarHandlerFalse = () => {
    setShowSideBar(false);
  };
  const sideBarHandlerTrue = () => {
    setShowSideBar(true);
  };
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div className='MainLayout__container'>
          <Sidebar
            {...props}
            showSideBar={showSideBar}
            sideBarHandlerFalse={sideBarHandlerFalse}
          />
          <div className='nav-component__container'>
            <Navbar {...props} sideBarHandlerTrue={sideBarHandlerTrue} />

            <Component {...props} />
          </div>
        </div>
      )}
    ></Route>
  );
}
