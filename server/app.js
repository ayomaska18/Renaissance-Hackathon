const express = require('express');
const sslLabsService = require('./webAnalysis/sslLabsService'); 
const builtWithService = require('./webAnalysis/builtWithService');
const whoIsService = require('./webAnalysis/whoIsService');
const whoHostService = require('./webAnalysis/whoHostThisService');
const needle = require('needle');
const analyzeWalletVolume = require('./walletAnalysis/analyzeWalletVolume');
const checkStakingActivities = require('./walletAnalysis/checkStakingActivities');
const analyzeWalletBalance = require('./walletAnalysis/analyzeWalletBalance');

const app = express();

let builtWithApi = 'cc1a9553-05bb-4e85-aecb-ec632b8eeb61';
let whoIsApi = 'at_glpSyChrGsNjta2IX8x9tOP6l7IDC'
let whoHostApi = 'wo0hx9ze9uo5x2ok22ktfgrunesnxrptrb0mb67udeoi4hfay4dvyehe6w2insj44rgpjm'

let url = 'https://dydx.exchange/'

// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });

async function init() {
  try {
    const builtWtihData = await builtWithService.getBuiltWithInfo(builtWithApi, url);
    const techSpendData = builtWithService.getSpendOnTech(builtWtihData);

    const whoIsData = await whoIsService.getWhoIsData(whoIsApi, url);
    const webCreationDateData = whoIsService.getCreationDate(whoIsData);
    const companyLocation = whoIsService.getCompanyLocation(whoIsData);

    const sslData = await sslLabsService.analyzeWithSSLabs(url);
    const sslTrustGrade = sslLabsService.getTrustGrade(sslData);

    const whoHostdata = await whoHostService.getWhoHostThisData( whoHostApi, url)
    const webHostingData = whoHostService.getWebHosting(whoHostdata);
  
    console.log("Tech Investments Monthly:", techSpendData);
    console.log("Web Creation Date:", webCreationDateData);
    console.log("Company Location:", companyLocation);
    console.log("SSL labs Trust Grade:", sslTrustGrade);
    console.log("Web Hosting Provider:", webHostingData);

    analyzeWalletVolume.getBlockTimes('3dRcbVsfijKjXv5zHEoRLY89NU7sU3KYEfuU8Kywb3iu')
    .then(async blockTimes => {
        const counts = analyzeWalletVolume.countDatesForMostRecentMonth(blockTimes);
        const activityRating = analyzeWalletVolume.checkRecentMonthWalletActivity(counts);
        console.log("Wallet Activity Rating:", activityRating);
    })
    .catch(err => console.error(err));

    const walletBalance = analyzeWalletBalance.getTokenBalance('HpWC6RNZYa9Q5E5fqBoeAfZvGHMMw1xLN4izUKErSsTh');
    console.log(walletBalance);

  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

init();

