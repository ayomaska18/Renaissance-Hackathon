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

  let apiUrl = `https://www.ssllabs.com/api/v4/analyze?host=${(host)}`; // Encode host

  const headers = {
    'email': 'hlc289@student.bham.ac.uk'
  };

  return axios.get(apiUrl, { headers })
    .then(response => response.data) 
    .catch(error => {
      console.error('Error performing SSL analysis:', error.response ? error.response.data : error.message);
      throw error;
    });
};

function getTrustGrade(Response) {
  if (Response.endpoints[0] && Response.endpoints[0].grade) {
    return Response.endpoints[0].grade
  } else {
    return 'unknown';
  }
}

module.exports = { registerWithSSLabs, analyzeWithSSLabs, getTrustGrade };
