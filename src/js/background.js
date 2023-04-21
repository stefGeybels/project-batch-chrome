import data from './variables.json'
import { urlParser } from './helpers/parseUrl';
import axios from 'axios';

const urlsToTrack = [
  "https://www.google.be"
];

// Define a variable to store the start time of the user's visit
let startTime = null;
let parser = new urlParser();

console.log('startup background worker');

let monitorUrl = null;
let changeUrl = null;

// // Listen for when the user navigates to a new page
// chrome.webNavigation.onCommitted.addListener((details) => {
//   // Check if the new page is one of the URLs we want to track
//   console.log('before if')
//   monitorUrl = parser.findBaseUrl(details.url);
//   if (urlsToTrack.includes(monitorUrl)) {
//     // Record the start time of the user's visit
//     console.log('starts timer');
//     startTime = Date.now();
//     console.log('this is the monitor url' + monitorUrl)
//   }
// });

// Listen for when the user navigates away from a tracked page
chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('enters the event')
  // Check if the page the user left is one of the URLs we want to track
  // console.log('moves to other page')
  if (!urlsToTrack.includes(details.url) && monitorUrl !== null) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      changeUrl = parser.findBaseUrl(tabs[0].url)
    })

    // console.log(parser.findDomain(monitorUrl) + ' ' + parser.findDomain(changeUrl))

    if(parser.findDomain(monitorUrl) !== parser.findDomain(changeUrl))
    {
        // Calculate the total time the user spent on the page
        // console.log('prepares request')
        const totalTime = Math.round((Date.now() - startTime) / 60000);

        // Send a POST request to the API with the total time and page URL
        // console.log('sends request with total time: ' + totalTime)
        // axios.post(data.url + '/test', {
        //   totalTime,
        //   pageUrl: details.url
        // })
        //   .then(response => {
        //     console.log("API post request sent successfully.");
        //   })
        //   .catch(error => {
        //     console.error("Error sending API post request:", error);
        //   });
        changeUrl = null;
        monitorUrl = null;
    }
  }
});
