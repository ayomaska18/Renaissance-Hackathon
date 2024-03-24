const express = require('express');
const sslLabsService = require('./webAnalysis/sslLabsService'); 
const builtWithService = require('./webAnalysis/builtWithService');
const whoIsService = require('./webAnalysis/whoIsService');
const whoHostService = require('./webAnalysis/whoHostThisService');

const app = express();

let builtwithapi = 'cc1a9553-05bb-4e85-aecb-ec632b8eeb61';
let whoisapi = 'at_glpSyChrGsNjta2IX8x9tOP6l7IDC'

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

async function init() {
  try {
    //const data = await builtWithService.getBuiltWithInfo(builtwithapi, 'www.builtwith.com');
    //const whoisdata = await whoIsService.getWhoIsData(whoisapi, 'www.builtwith.com');
    //console.log(builtWithService.getSpendOnTech(data));
    const data = await whoHostService.getWhoHostThisData('wo0hx9ze9uo5x2ok22ktfgrunesnxrptrb0mb67udeoi4hfay4dvyehe6w2insj44rgpjm', 'https://dydx.exchange/')
    console.log(whoHostService.getCreationDate(data));
    
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

init();

// sslLabsService.analyzeWithSSLabs('www.ssllabs.com');
