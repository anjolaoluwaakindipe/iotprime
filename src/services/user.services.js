const axios = require('axios');
const API_URL = 'http://localhost:7000/anj/user/';

const login = async (email, password) => {
  return await axios
    .post(API_URL + 'login', { email, password })
    .then((res) => {
      if (res.headers['auth-token']) {
        localStorage.setItem(
          'token',
          JSON.stringify({ token: res.headers['auth-token'] })
        );
      }
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err.msg;
    });
};

const register = async (username, email, password, lastName, firstName) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    lastName,
    password,
    firstName,
  });
};

const userData = async (token) => {
  return await axios
    .get(API_URL + 'home', { headers: { 'Auth-Token': token } })
    .then((res) => {
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => err.message);
};

const emailChecker = async (username) => {
  return await axios.get(API_URL + 'usernamecheck/' + username).then((res) => {
    return res.data;
  });
};

const logout = async () => {
  await localStorage.removeItem('token');
  await localStorage.removeItem('user');
};

export { login, logout, emailChecker, userData, register };
