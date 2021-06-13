const axios = require('axios').default;
const API_URL = '/anj/log/';

exports.getLogs = async (projectID) => {
  return await axios.get(API_URL + projectID).then((res) => res.data);
};
