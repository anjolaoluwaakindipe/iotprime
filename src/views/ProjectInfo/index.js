import React, { useState, useEffect } from 'react';
import { getAProject } from '../../services/project.services';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import Grid from '@material-ui/core/Grid';

// react-icon
import { BiArrowBack } from 'react-icons/bi';

// css import
import './ProjectInfo.scss';

function ProjectInfo() {
  const [projectInfo, setProjectInfo] = useState({ projectFields: [] });
  const { projectID } = useParams();
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  

  useEffect(() => {
    const startUp = async () => {
      const project = await getAProject(projectID, tokenStorage.token);
      console.log(project.data);
      setProjectInfo(project.data);
      console.log(projectInfo);
    };
    startUp();
  }, []);

  return (
    <div className='Dashboard-component ProjectInfo__container'>
      <BiArrowBack
        onClick={() => {
          history.goBack();
        }}
        style={{
          fontSize: '25px',
          marginBottom: '2rem',
          cursor: 'pointer',
          ':hover': { backgroundColor: 'grey' },
        }}
      />
      <h1 className='ProjectInfo__title'>PROJECT INFORMATION</h1>
      <Grid container spacing={7} component='main'>
        <Grid container xs={12} md={6} className='ProjectInfo__info-container'>
          <Grid item xs={12} className='ProjectInfo__header'>
            NAME
          </Grid>
          <Grid item xs={12} className='ProjectInfo__content'>
            {projectInfo?.projectName}
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} className='ProjectInfo__info-container'>
          <Grid item xs={12} className='ProjectInfo__header'>
            DESCRIPTION
          </Grid>
          <Grid item xs={12} className='ProjectInfo__content'>
            {projectInfo?.projectDescription}
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} className='ProjectInfo__info-container'>
          <Grid item xs={12} className='ProjectInfo__header'>
            TIME CREATED
          </Grid>
          <Grid item xs={12} className='ProjectInfo__content'>
            {new Date(projectInfo?.projectTimeCreated).toLocaleString()}
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} className='ProjectInfo__info-container'>
          <Grid item xs={12} className='ProjectInfo__header'>
            PARAMETERS
          </Grid>
          <Grid item xs={12} className='ProjectInfo__content'>
            {projectInfo?.projectFields.length}
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} className='ProjectInfo__info-container'>
          <Grid item xs={12} className='ProjectInfo__header'>
            DATA URL
          </Grid>
          <Grid item xs={12} className='ProjectInfo__content'>
            {`${window.location.hostname}/anj/data/${user?.email}/${projectInfo?.projectAPI}`}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProjectInfo;
