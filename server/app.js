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

let builtWithApi = 'b6e9dd13-73f1-46a9-9ab0-1ea7fe1f9385';
let whoIsApi = 'at_glpSyChrGsNjta2IX8x9tOP6l7IDC';
let whoHostApi = 'wo0hx9ze9uo5x2ok22ktfgrunesnxrptrb0mb67udeoi4hfay4dvyehe6w2insj44rgpjm';
let solTestNetAddress = 'HpWC6RNZYa9Q5E5fqBoeAfZvGHMMw1xLN4izUKErSsTh';

let url = 'https://www.facebook.com/';

async function init() {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out.')), 180000);
  });

  try {
    const initLogicPromise = (async () => {
    const builtWtihData = await builtWithService.getBuiltWithInfo(builtWithApi, url);
    const techSpendData = builtWithService.getSpendOnTech(builtWtihData);

    const whoIsData = await whoIsService.getWhoIsData(whoIsApi, url);
    const webCreationDateData = whoIsService.getCreationDate(whoIsData);
    const companyLocation = whoIsService.getCompanyLocation(whoIsData);

    const sslData = await sslLabsService.analyzeWithSSLabs(url);
    const sslTrustGrade = sslLabsService.getTrustGrade(sslData);

    const whoHostdata = await whoHostService.getWhoHostThisData( whoHostApi, url)
    const webHostingData = whoHostService.getWebHosting(whoHostdata);

    console.log("-----------------")
    console.log("Project Analysis");
    console.log("-----------------")
    console.log("Web Analysis:", url);
    console.log("Tech Investments Monthly:", techSpendData);
    console.log("Web Creation Date:", webCreationDateData);
    console.log("Company Location:", companyLocation);
    console.log("SSL labs Trust Grade:", sslTrustGrade);
    console.log("Web Hosting Provider:", webHostingData);
    console.log("-----------------")
    console.log("Wallet Analysis");
    console.log("-----------------")
    console.log('Address:', solTestNetAddress);

    analyzeWalletVolume.getBlockTimes(solTestNetAddress)
    .then(async blockTimes => {
        const counts = analyzeWalletVolume.countDatesForMostRecentMonth(blockTimes);
        const activityRating = analyzeWalletVolume.checkRecentMonthWalletActivity(counts);
        console.log("Wallet Activity Rating:", activityRating);
    })
    .catch(err => console.error(err));

    analyzeWalletBalance.getTokenBalance(solTestNetAddress)
    .then(walletBalance => {
    })
    .catch(err => console.error(err));
  })();

    await Promise.race([initLogicPromise, timeoutPromise]);


  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
  (async () => {
    try {
        await checkStakingActivities.getStakingActivities('HpWC6RNZYa9Q5E5fqBoeAfZvGHMMw1xLN4izUKErSsTh');
    } catch (error) {
        console.error('Error:', error);
    }
})();
}

init();

