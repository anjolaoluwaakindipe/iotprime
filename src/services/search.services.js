const axios = require('axios').default;
const API_URL = 'http://localhost:7000/anj/search';

exports.searchData = async (searchData) => {
  return await axios
    .get(API_URL, { params: { dataSearch: searchData } })
    .then((res) => res.data);
};
