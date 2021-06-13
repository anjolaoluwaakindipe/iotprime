const axios = require('axios').default;
const API_URL = 'http://localhost:7000/anj/project/';

exports.getAProject = async (projectID, token) => {
  return axios
    .get(API_URL + projectID, { headers: { 'Auth-Token': token } })
    .then((res) => res.data);
};

exports.getAllProjects = async (token) => {
  return axios
    .get(API_URL, { headers: { 'Auth-Token': token } })
    .then((res) => {
      return res.data;
    });
};
