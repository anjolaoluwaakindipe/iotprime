import React from 'react';

// installed packages
import { Route } from 'react-router-dom';

// custom packages
import Navbar from '../sharedcomponents/Navbar';

export default function MainLayout({ exact, path, component: Component }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <Navbar {...props} />
          <Component {...props} />
        </div>
      )}
    ></Route>
  );
}
