const axios = require('axios').default;
const API_URL = '/anj/data/';

const getDataDay = async (token, projectID, dataField) => {
  return await axios
    .get(API_URL + `${projectID}/${dataField}/todaydata`, {
      headers: {
        'Auth-Token': token,
      },
    })
    .then((res) => res.data);
};

const getDataWeek = async (token, projectID, dataField) => {
  return await axios
    .get(API_URL + `${projectID}/${dataField}/weekdata`, {
      headers: {
        'Auth-Token': token,
      },
    })
    .then((res) => res.data);
};

const getDataYear = async (token, projectID, dataField) => {
  return await axios
    .get(API_URL + `${projectID}/${dataField}/yeardata`, {
      headers: {
        'Auth-Token': token,
      },
    })
    .then((res) => res.data);
};

const getDataAnyDate = async (token, projectID, dataField, date) => {
  return await axios
    .post(
      API_URL + `${projectID}/${dataField}/anydate`,
      { date },
      {
        headers: {
          'Auth-Token': token,
        },
      }
    )
    .then((res) => res.data);
};

export { getDataAnyDate, getDataDay, getDataYear, getDataWeek };
