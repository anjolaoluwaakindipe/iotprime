import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Project.scss';

// redux actions
import { setCurrentProject } from '../../redux/Project/projectaction';

// custom services
import { getAProject } from '../../services/project.services';

const Project = () => {
  // variables
  const { projectID } = useParams();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const history = useHistory();

  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  if (!tokenStorage) {
    history.push('/login');
  }

  // functions
  const fieldClickHandler = (projectID, fieldID) => {
    history.push(`/project/${projectID}/graph/${fieldID}`);
  };

  // useEffect
  useEffect(() => {
    const startUp = async () => {
      const currentProjectData = await getAProject(
        projectID,
        tokenStorage.token
      ).catch((err) => console.log(err.message));
      dispatch(setCurrentProject(currentProjectData.data));
      console.log(currentProjectData);
    };
    startUp();
  }, []);

  return (
    <div className='Project__container Dashboard-component'>
      <h1>Welcome to Project route {currentProject.projectName}</h1>
      {currentProject.projectFields.map((field) => (
        <div
          onClick={() => fieldClickHandler(currentProject._id, field.fieldName)}
          key={field._id}
        >
          <h4>{field.fieldName}</h4>
        </div>
      ))}
    </div>
  );
};

export default Project;
