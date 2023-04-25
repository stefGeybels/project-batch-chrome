import data from './variables.json'
import { urlParser } from './helpers/parseUrl';
import axios from 'axios';
import { PageVisit } from './helpers/pageVisited';

const urlsToTrack = [
  "https://www.google.be",
  "https://www.facebook.com"
];

let startTime = null;
let parser = new urlParser();
let request = new PageVisit();

console.log('startup background worker');

let monitorUrl = null;
let currentUrl = null;
let tabChangeUrl = null;
let wasFocused = true;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    currentUrl = parser.findBaseUrl(tabs[0].url)

    if(!wasFocused){
      wasFocused = true;
      return;
    }
    wasFocused = true;

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
        console.log('time spend on site: ' + totalTime + ' - website: ' + monitorUrl + ' - new search')
        request.sendPageVisit(totalTime, monitorUrl)
        startTime = new Date();
      }
      monitorUrl = currentUrl;
      return;
    }
    
    if(urlsToTrack.includes(monitorUrl) && monitorUrl !== null){
      const totalTime = Math.round((new Date() - startTime) / 1000);
      console.log('time spend on site: ' + totalTime + ' - website: ' + monitorUrl + ' - new search (not in list)')
      request.sendPageVisit(totalTime, monitorUrl)
      monitorUrl = null;
      startTime = null;
    }
  })
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    tabChangeUrl = parser.findBaseUrl(tabs[0].url)

    if (urlsToTrack.includes(monitorUrl) && monitorUrl != null && wasFocused) {
      const totalTime = Math.round((new Date() - startTime) / 1000);
      console.log('time spend on site: ' + totalTime + ' - website: ' + monitorUrl + ' - tab changed')
      request.sendPageVisit(totalTime, monitorUrl)
      startTime = null;
      monitorUrl = null;
    }
    
    
    if(urlsToTrack.includes(tabChangeUrl)){  
      startTime = new Date();
      monitorUrl = tabChangeUrl;
    }
    wasFocused = true;
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    wasFocused = false;
    if(urlsToTrack.includes(monitorUrl) && monitorUrl !== null){
      const totalTime = Math.round((new Date() - startTime) / 1000);
      console.log('time spend on site: ' + totalTime + ' - website: ' + monitorUrl + ' - window focus changed')
      request.sendPageVisit(totalTime, monitorUrl)
      startTime = null;
      monitorUrl = null;
      return;
    }
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    currentUrl = parser.findBaseUrl(tabs[0].url)

    if(urlsToTrack.includes(currentUrl)){
      startTime = new Date();
      monitorUrl = currentUrl;
    }   
  });
});
