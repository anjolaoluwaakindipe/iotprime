import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// redux actions
import { setCurrentProject } from '../../redux/Project/projectaction';

// custom services
import { getAProject } from '../../services/project.services';

const Project = () => {
  // variables
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const history = useHistory();

  // functions
  const fieldClickHandler = (projectID, fieldID) => {
    history.push(`/project/${projectID}/graph/${fieldID}`);
  };

  // useEffect
  useEffect(() => {
    const startUp = async () => {
      const tokenStorage = JSON.parse(localStorage.getItem('token'));
      if (!tokenStorage) {
        return history.push('/login');
      }
      const currentProjectData = await getAProject(
        id,
        tokenStorage.token
      ).catch((err) => console.log(err.message));
      if (!currentProjectData.data) {
        return history.push('/login');
      }
      dispatch(setCurrentProject(currentProjectData.data));
    };
    startUp();
  }, [dispatch, id, history]);

  return (
    <div>
      <h1>Welcome to Project route {currentProject.projectName}</h1>
      {currentProject.projectFields.map((field) => (
        <div
          onClick={() => fieldClickHandler(currentProject._id, field._id)}
          key={field._id}
        >
          <h4>{field.fieldName}</h4>
        </div>
      ))}
    </div>
  );
};

export default Project;
