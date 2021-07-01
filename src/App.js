// package imports
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// http services
import { logout, userData } from './services/user.services';

//custom imports
import {
  Dashboard,
  Graph,
  Login,
  Project,
  Register,
  ErrorPage,
  Home,
  Projects,
} from './views';
import MainLayout from './views/layouts/MainLayout';
import { loginUserFailure, loginUserSuccess } from './redux/Auth/authActions';

function App() {
  const isLogged = useSelector((state) => {
    return state.auth.isLogged;
  });
  const dispatch = useDispatch();
  const tokenStorage = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    const loginUser = async () => {
      if (tokenStorage) {
        const gottenUserData = await userData(tokenStorage.token).then(
          (data) => data
        );
        if (!gottenUserData.success) {
          dispatch(loginUserFailure());
          await logout();
        }
        dispatch(loginUserSuccess(gottenUserData.data));
      }
    };
    loginUser();
  }, [dispatch, isLogged, tokenStorage]);

  return (
    <Switch>
      <MainLayout path='/' exact componet={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <MainLayout path='/dashboard' component={Dashboard} />
      <MainLayout path='/project/:projectID/graph/:dataID' component={Graph} />
      <MainLayout path='/project' component={Projects} exact />
      <MainLayout path='/project/:projectID' component={Project} exact />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;
