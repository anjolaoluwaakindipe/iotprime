// package imports
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// http services
import userServices from './services/user.services';

//custom imports
import {
  Dashboard,
  Graph,
  Login,
  Project,
  Register,
  ErrorPage,
  Home,
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
        const userData = await userServices
          .userData(tokenStorage.token)
          .then((data) => data);
        if (!userData.success) {
          dispatch(loginUserFailure());
          await userServices.logout();
        }
        dispatch(loginUserSuccess(userData.data));
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
      <MainLayout path='/project/:id/graph/:id' component={Graph} />
      <MainLayout path='/project/:id' component={Project} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;
