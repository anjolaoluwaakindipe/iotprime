import { SETALLPROJECTS, SETCURRENTPROJECTS } from './projecttype';

export const setAllProjects = (allProjects) => {
  return {
    type: SETALLPROJECTS,
    payload: {
      allProjects: allProjects,
    },
  };
};

export const setCurrentProject = (currentProject) => {
  return {
    type: SETCURRENTPROJECTS,
    payload: {
      currentProject: currentProject,
    },
  };
};
