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
let currentUrl = null;

function getUrl(){
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    currentUrl = parser.findBaseUrl(tabs[0].url)
    console.log(currentUrl)
  })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  getUrl()

  if(urlsToTrack.includes(currentUrl)){
    if(startTime == null){
      startTime = new Date();
      return;
    }

    if(monitorUrl === null) 
    {
      monitorUrl = currentUrl
      return;
    }

    if(parser.findDomain(currentUrl) !== parser.findDomain(monitorUrl)){
      const totalTime = Math.round((new Date() - startTime) / 1000);
      console.log('time spend on site: ' + totalTime + ' - website: ' + monitorUrl)
      // request.sendPageVisit(totalTime, monitorUrl)
      startTime = new Date();
    }
    monitorUrl = currentUrl;

    if(!urlsToTrack.includes(currentUrl))
    {
      startTime = null;
    }
    // console.log('tracked url')
    return;
  }
  
  if(urlsToTrack.includes(monitorUrl) && monitorUrl !== null){
    const totalTime = Math.round((new Date() - startTime) / 1000);
    console.log('time spend on site: ' + totalTime + ' - website: ' + monitorUrl)
    // request.sendPageVisit(totalTime, monitorUrl)
    monitorUrl = null;
    startTime = null;
  }
});

// // Listen for when the user navigates to a new page
// // Events get fired after user leaves the page
// chrome.webNavigation.onCommitted.addListener((details) => {
//   newUrl = parser.findBaseUrl(details.url)

//   if(urlsToTrack.includes(newUrl)){
//     if(startTime == null){
//       startTime = new Date();
//     }

//     console.log('before if : ' + newUrl, 'monitor url : ' + monitorUrl)

//     if(parser.findDomain(newUrl) !== parser.findDomain(monitorUrl) && monitorUrl != null){
//       const totalTime = Math.round((new Date() - startTime) / 1000);
//       console.log('time spend on site: ' + totalTime)
//       // request.sendPageVisit(totalTime, monitorUrl)
//       startTime = new Date();
//     }
//     monitorUrl = newUrl;
//     // console.log('tracked url')
//     return;
//   }
//   // console.log('not a tracked url: ' + newUrl)
// });

// // Listen for when the user navigates away from a tracked page
// // This should listen to when a user navigates to a non tracked page
// // Event get fired when user enters a page
// chrome.webNavigation.onCompleted.addListener((details) => {
//   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//     changeUrl = parser.findBaseUrl(tabs[0].url)
//   })

//   //stops event
//   //early return if are a good way to make checks before editing url
//   if(parser.findDomain(changeUrl) === parser.findDomain(monitorUrl) || changeUrl === null){
//     console.log('enterd if')
//     return;
//   }

//   if(parser.findDomain(newUrl) !== parser.findDomain(monitorUrl) && monitorUrl != null){
//     console.log('check enterd! Monitor: ' + monitorUrl + ' - newUrl: ' + newUrl)
//     // Variable needs to be changed here => other wise we don't have anything to prevent event from duplicate firing
//     monitorUrl = newUrl;
//     return;
//   }

//   console.log(changeUrl + ' - ' + monitorUrl)

//   // console.log('Navigation activated: ' + changeUrl)

//   if(!urlsToTrack.includes(changeUrl)){
//     console.log('url is not included in list')
//   }

//   // if(urlsToTrack.includes(newUrl)){
//   //   console.log('before if: ' + newUrl, 'monitor url: ' + monitorUrl)
//   //   if(parser.findDomain(newUrl) !== parser.findDomain(monitorUrl)){
//   //     // const totalTime = Math.round((Date.now() - startTime) / 60000);
//   //     // request.sendPageVisit(totalTime, monitorUrl)
//   //     // startTime = Date.now();
//   //     console.log(monitorUrl)
//   //   }
//   //   monitorUrl = newUrl;
//   // }


//   // if (!urlsToTrack.includes(details.url) && monitorUrl !== null) {
//   //   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//   //     changeUrl = parser.findBaseUrl(tabs[0].url)
//   //   })

//   //   if(parser.findDomain(monitorUrl) !== parser.findDomain(changeUrl))
//   //   {
//   //       const totalTime = Math.round((Date.now() - startTime) / 60000);

//   //       // axios.post(data.url + '/test', {
//   //       //   totalTime,
//   //       //   pageUrl: details.url
//   //       // })
//   //       //   .then(response => {
//   //       //     console.log("API post request sent successfully.");
//   //       //   })
//   //       //   .catch(error => {
//   //       //     console.error("Error sending API post request:", error);
//   //       //   });
//   //       changeUrl = null;
//   //       monitorUrl = null;
//   //   }
//   // }
// });
