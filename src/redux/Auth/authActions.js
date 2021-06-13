import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from './authTypes';

const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      user,
    },
  };
};

const loginUserFailure = () => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      user: null,
    },
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: {
      user: null,
    },
  };
};

export { loginUserSuccess, loginUserFailure, logoutUser };
