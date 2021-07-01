import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import download from 'downloadjs';

// react redux
import { useSelector, useDispatch } from 'react-redux';

// redux actions
import { setAllProjects } from '../../redux/Project/projectaction';
import {
  setLoadingFalse,
  setLoadingTrue,
} from '../../redux/Loading/loadingAction';

// css import
import './Projects.scss';

// components
import AddProjectButton from './components/AddProjectButton';
import ProjectCard from './components/ProjectCard';

// custom services
import { getAllProjects } from '../../services/project.services';
import { downloadcsv } from '../../services/export.services';

export default function Projects() {
  const allProjects = useSelector((state) => state.project.allProjects);
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();

  const downloadcsvClick = async (projectID) => {
    if (tokenStorage) {
      const csv = await downloadcsv(tokenStorage.token, projectID);
      if (csv) {
        download(csv);
      }
    }
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
  }, []);

  return (
    <div className='Projects__container Dashboard-component'>
      <Typography className='Projects__title' variant='h2'>
        Projects
      </Typography>
      {allProjects.length === 0 ? (
        <div className='Projects__content'>
          <div className='Projects__loading-div'></div>
          <div className='Projects__loading-div'></div>
          <div className='Projects__loading-div'></div>
          <div className='Projects__loading-div'></div>
          <div className='Projects__loading-div'></div>
          <AddProjectButton />
        </div>
      ) : (
        <div className='Projects__content'>
          {allProjects.map((project) => (
            <ProjectCard
              key={project._id}
              name={project.projectName}
              description={project.projectDescription}
              timeCreated={project.projectTimeCreated}
              dateCreated={project.projectDateCreated}
              onClick={() => {
                downloadcsvClick(project._id);
              }}
            />
          ))}
          <AddProjectButton />
        </div>
      )}
    </div>
  );
}
