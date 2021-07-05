const axios = require('axios').default;

const BASE_API = '/anj/export/csv/';

const downloadcsv = async (token, projectID) => {
  return await axios.get(BASE_API + `${projectID}`, {
    headers: { 'Auth-Token': token, responseType: 'blob' },
  });
};

export { downloadcsv };
