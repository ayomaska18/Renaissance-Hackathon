const axios = require('axios')

const getWhoHostThisData = (apiKey, domainName, options = {}) => {
    const params = {
      key: apiKey,
      url: domainName,
      outputFormat: 'JSON'
    };

    const queryString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

    const url = `https://www.who-hosts-this.com/API/Host?${queryString}`;

    console.log(url);

    return axios.get(url)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching WhoIs data:', error.message);
        throw error;
      });
  }

function getCreationDate(response) {
    if (response.results && response.results[0].isp_name) {
        return response.results[0].isp_name;
    } else {
        return "unknown";
    }
}

module.exports = { getWhoHostThisData, getCreationDate };