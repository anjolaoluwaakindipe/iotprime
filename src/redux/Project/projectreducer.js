import { SETALLPROJECTS, SETCURRENTPROJECTS } from './projecttype';

const initialState = {
  allProjects: [],
  currentProject: {
    projectFields: [],
  },
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETALLPROJECTS:
      return {
        ...state,
        allProjects: action.payload.allProjects,
      };
    case SETCURRENTPROJECTS:
      return {
        ...state,
        currentProject: action.payload.currentProject,
      };
    default:
      return state;
  }
};

export default projectReducer;
