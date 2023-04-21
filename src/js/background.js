import data from './variables.json'
import { urlParser } from './helpers/parseUrl';
import axios from 'axios';
import { PageVisit } from './helpers/pageVisited';

const urlsToTrack = [
  "https://www.google.be",
  "https://www.facebook.com"
];

// Define a variable to store the start time of the user's visit
let startTime = null;
let parser = new urlParser();
let request = new PageVisit();

console.log('startup background worker');

let monitorUrl = null;
let changeUrl = null;
let newUrl = null;

// Listen for when the user navigates to a new page
chrome.webNavigation.onCommitted.addListener((details) => {
  newUrl = parser.findBaseUrl(details.url)

  if(urlsToTrack.includes(newUrl)){
    console.log('before if : ' + newUrl, 'monitor url : ' + monitorUrl)
    if(parser.findDomain(newUrl) !== parser.findDomain(monitorUrl) && monitorUrl != null){
      // const totalTime = Math.round((Date.now() - startTime) / 60000);
      // request.sendPageVisit(totalTime, monitorUrl)
      // startTime = Date.now();
      console.log('monitor url: ' + monitorUrl)
    }
    console.log('after if')
    monitorUrl = newUrl;
  }

});

// Listen for when the user navigates away from a tracked page
chrome.webNavigation.onCompleted.addListener((details) => {
  // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  //   newUrl = parser.findBaseUrl(tabs[0].url)
  // })

  // if(urlsToTrack.includes(newUrl)){
  //   console.log('before if: ' + newUrl, 'monitor url: ' + monitorUrl)
  //   if(parser.findDomain(newUrl) !== parser.findDomain(monitorUrl)){
  //     // const totalTime = Math.round((Date.now() - startTime) / 60000);
  //     // request.sendPageVisit(totalTime, monitorUrl)
  //     // startTime = Date.now();
  //     console.log(monitorUrl)
  //   }
  //   monitorUrl = newUrl;
  // }


  // if (!urlsToTrack.includes(details.url) && monitorUrl !== null) {
  //   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  //     changeUrl = parser.findBaseUrl(tabs[0].url)
  //   })

  //   if(parser.findDomain(monitorUrl) !== parser.findDomain(changeUrl))
  //   {
  //       const totalTime = Math.round((Date.now() - startTime) / 60000);

  //       // axios.post(data.url + '/test', {
  //       //   totalTime,
  //       //   pageUrl: details.url
  //       // })
  //       //   .then(response => {
  //       //     console.log("API post request sent successfully.");
  //       //   })
  //       //   .catch(error => {
  //       //     console.error("Error sending API post request:", error);
  //       //   });
  //       changeUrl = null;
  //       monitorUrl = null;
  //   }
  // }
});
