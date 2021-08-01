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
  LogFolder,
  CreateProject,
  ProjectInfo,
  Logs,
  Log,
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
      <Route path='/' component={Home} exact />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <MainLayout path='/dashboard' component={Dashboard} />
      <MainLayout path='/project/:projectID/graph/:dataID' component={Graph} />
      <MainLayout path='/project' component={Projects} exact />
      <MainLayout path='/project/:projectID' component={Project} exact />
      <MainLayout path='/log' component={LogFolder} exact />
      <MainLayout path='/log/:projectID' component={Logs} exact />
      <MainLayout path='/log/:projectID/:logID' component={Log} exact />
      <MainLayout path='/create-project' component={CreateProject} exact />
      <MainLayout
        path='/project-info/:projectID'
        component={ProjectInfo}
        exact
      />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;
