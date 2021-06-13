import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

// css import
import './Dashboard.scss';

// redux actions
import { setAllProjects } from '../../redux/Project/projectaction';
import {
  setLoadingFalse,
  setLoadingTrue,
} from '../../redux/Loading/loadingAction';

// images
import loader from '../../images/loader.gif';

// custom service imports
import { getAllProjects } from '../../services/project.services';

const Dashboard = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const userData = useSelector((state) => state.auth.user);
  const allProjects = useSelector((state) => state.project.allProjects);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const tokenStorage = JSON.parse(localStorage.getItem('token'));

  const projectClickHandler = (projectID) => {
    history.push(`/project/${projectID}`);
  };

  useEffect(() => {
    const startup = async () => {
      dispatch(setLoadingTrue());

      if (tokenStorage) {
        const allProjects = await getAllProjects(tokenStorage.token).catch(
          (err) => {
            console.log(err.message);
          }
        );
        if (allProjects === undefined) {
          return <Redirect to='/login' />;
        }
        dispatch(setAllProjects(allProjects.data));
        dispatch(setLoadingFalse());
      }
    };
    startup();
  }, [dispatch, history]);

  if (!isLogged) {
    return <Redirect to='/login' />;
  }

  if (loading) {
    return (
      <div className='Loader__container'>
        <img src={loader} className='Loader__' alt='loading...' />
      </div>
    );
  }
  return (
    <div className=''>
      <h1>{userData.username}</h1>
      {allProjects.map((project) => (
        <div onClick={() => projectClickHandler(project._id)} key={project._id}>
          <h4>{project.projectName}</h4>
          <p>{project.projectDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
