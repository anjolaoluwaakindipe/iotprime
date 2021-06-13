const axios = require('axios').default;
const API_URL = 'http://localhost:7000/anj/log/';

exports.getLogs = async (projectID) => {
  return await axios.get(API_URL + projectID).then((res) => res.data);
};
