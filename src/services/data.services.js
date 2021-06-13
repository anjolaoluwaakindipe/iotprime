const axios = require('axios').default;
const API_URL = 'http://localhost:7000/anj/data/';

exports.getDataDay = async (token, projectID, dataField) => {
  return await axios
    .get(API_URL + `${projectID}/${dataField}/todaydata`, { headers: token })
    .then((res) => res.data);
};

exports.getDataWeek = async (token, projectID, dataField) => {
  return await axios
    .get(API_URL + `${projectID}/${dataField}/weekdata`, { headers: token })
    .then((res) => res.data);
};

exports.getDataYear = async (token, projectID, dataField) => {
  return await axios
    .get(API_URL + `${projectID}/${dataField}/yeardata`, { headers: token })
    .then((res) => res.data);
};

exports.getDataAnyDate = async (token, projectID, dataField, date) => {
  return await axios
    .post(
      API_URL + `${projectID}/${dataField}/anydate`,
      { date },
      { headers: token }
    )
    .then((res) => res.data);
};
