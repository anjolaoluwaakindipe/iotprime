const axios = require('axios').default;

const BASE_API = '/export/csv';

const downloadcsv = async (token, projectID) => {
  return await axios
    .get(BASE_API + `/${projectID}`, {
      headers: { 'Auth-Token': token },
      responseType: 'blob',
    })
    .then(({ data }) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'file.csv'); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
};

export { downloadcsv };
