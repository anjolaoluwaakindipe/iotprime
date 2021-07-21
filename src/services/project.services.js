const axios = require('axios').default;
const API_URL = '/anj/project/';

const createAProject = async (
  token,
  name,
  description,
  field1,
  field1Unit,
  field2,
  field2Unit,
  field3,
  field3Unit,
  field4,
  field4Unit,
  field5,
  field5Unit,
  field6,
  field6Unit,
  field7,
  field7Unit,
  field8,
  field8Unit
) => {
  return axios
    .post(
      API_URL,
      {
        name,
        description,
        field1,
        field1Unit,
        field2,
        field2Unit,
        field3,
        field3Unit,
        field4,
        field4Unit,
        field5,
        field5Unit,
        field6,
        field6Unit,
        field7,
        field7Unit,
        field8,
        field8Unit,
      },
      { headers: { 'Auth-Token': token } }
    )
    .then((res) => res.data);
};

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

const deleteProject = async (token, projectID) => {
  return axios.delete(API_URL + projectID, {
    headers: { 'Auth-Token': token },
  });
};

export { getAProject, getAllProjects, deleteProject, createAProject };
