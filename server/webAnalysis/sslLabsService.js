const axios = require('axios');

const registerData = {
  firstName: "Ho Lun",
  lastName: "Chung",
  email: "hlc289@student.bham.ac.uk",
  organization: "University of Birmingham"
};

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const registerWithSSLabs = () => {
  axios.post('https://www.ssllabs.com/api/v4/register', registerData, config)
    .then((response) => {
      console.log('Response:', response.data);
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message);
    });
}

const analyzeWithSSLabs = (host, options = {}) => {
  const { publish = 'off', startNew = 'off', fromCache = 'off', maxAge, all = 'on', ignoreMismatch = 'off' } = options;

  let apiUrl = `https://www.ssllabs.com/api/v4/analyze?host=${encodeURIComponent(host)}`;

  // Fixed headers object to include the email
  const headers = {
    'email': 'hlc289@student.bham.ac.uk'
  };

  if (publish) apiUrl += `&publish=${publish}`;
  if (startNew) apiUrl += `&startNew=${startNew}`;
  if (fromCache) apiUrl += `&fromCache=${fromCache}`;
  if (maxAge) apiUrl += `&maxAge=${maxAge}`;
  if (all) apiUrl += `&all=${all}`;
  if (ignoreMismatch) apiUrl += `&ignoreMismatch=${ignoreMismatch}`;

  axios.get(apiUrl, { headers }) // Properly pass the headers object
    .then((response) => {
      console.log('SSL Analysis Result:', response.data);
    })
    .catch((error) => {
      console.error('Error performing SSL analysis:', error.response ? error.response.data : error.message);
    });
};

module.exports = { registerWithSSLabs, analyzeWithSSLabs };
