const axios = require('axios').default;
const API_URL = '/anj/log';

// const getLogs = async (projectID) => {
//   return await axios.get(API_URL + projectID).then((res) => res.data);
// };

const getLogFolder = async (token) => {
  return await axios
    .get(API_URL + '/folder', { headers: { 'Auth-Token': token } })
    .then((res) => res.data);
};

const deleteProjectFolder = async (token, projectID) => {
  return await axios
    .delete(API_URL + '/folder/' + projectID, {
      headers: { 'Auth-Token': token },
    })
    .then((res) => res.data);
};

const getProjectLogs = async (projectID) => {
  return await axios.get(API_URL + '/' + projectID).then((res) => res.data);
};
const getOneProjectLog = async (projectID, logID) => {
  return await axios
    .get(API_URL + '/' + projectID + '/' + logID)
    .then((res) => res.data);
};

const deleteSpecificLog = async (token, projectID, logID) => {
  return await axios
    .delete(API_URL + '/' + projectID + '/' + logID, {
      headers: { 'Auth-Token': token },
    })
    .then((res) => res.data);
};

const readLog = async (token, projectID, logID) => {
  return await axios
    .put(API_URL + '/' + projectID + '/' + logID, {
      headers: { 'Auth-Token': token },
    })
    .then((res) => res.data);
};

export {
  getLogFolder,
  deleteProjectFolder,
  getProjectLogs,
  deleteSpecificLog,
  readLog,
  getOneProjectLog,
};
