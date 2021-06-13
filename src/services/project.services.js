const axios = require('axios').default;
const API_URL = '/anj/project/';

const getAProject = async (projectID, token) => {
  return axios
    .get(API_URL + projectID, { headers: { 'Auth-Token': token } })
    .then((res) => res.data);
};

const getAllProjects = async (token) => {
  return axios
    .get(API_URL, { headers: { 'Auth-Token': token } })
    .then((res) => {
      return res.data;
    });
};

export { getAProject, getAllProjects };
