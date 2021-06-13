import { SETLOADINGFALSE, SETLOADINGTRUE } from './loadingtype';

const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETLOADINGTRUE:
      return {
        ...state,
        loading: true,
      };
    case SETLOADINGFALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
