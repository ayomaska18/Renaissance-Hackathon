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
    let spend = Response.Results[0].Result.Spend;
    return spend
}

// function extractTechnologies(apiResponse) {

    
//     let technologyNames = [];

//     if (apiResponse.Results[0] && apiResponse.Results[0].length > 0) {
//         apiResponse.Results[0].forEach(result => {
//             if (result.Result && result.Result.Paths) {
//                 result.Result.Paths.forEach(path => {
//                     if (path.Technologies) {
//                         path.Technologies.forEach(tech => {
//                             technologyNames.push(tech.Name);
//                         });
//                     }
//                 });
//             }
//         });
//     }
    
//     return technologyNames;
// }



module.exports = { getBuiltWithInfo, getSpendOnTech};
