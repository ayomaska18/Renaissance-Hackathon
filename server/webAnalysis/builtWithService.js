const axios = require('axios');

function getBuiltWithInfo(apiKey, domain) {
  const apiUrl = `https://api.builtwith.com/v21/api.json?KEY=${apiKey}&LOOKUP=${encodeURIComponent(domain)}`;
  return axios.get(apiUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data from BuiltWith:', error.message);
      throw error;
    });
}

function getSpendOnTech(Response) {
  if (Response.Results[0] && Response.Results[0].Result.Spend) {
      return Response.Results[0].Result.Spend;
  } else {
    return "unknown";
  }
}

module.exports = { getBuiltWithInfo, getSpendOnTech};
