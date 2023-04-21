import data from './variables.json'

const urlsToTrack = [
  "https://google.be"
];

// Define a variable to store the start time of the user's visit
let startTime = null;

// Listen for when the user navigates to a new page
chrome.webNavigation.onCommitted.addListener((details) => {
  // Check if the new page is one of the URLs we want to track
  if (urlsToTrack.includes(details.url)) {
    // Record the start time of the user's visit
    startTime = Date.now();
  }
});

// Listen for when the user navigates away from a tracked page
chrome.webNavigation.onCompleted.addListener((details) => {
  // Check if the page the user left is one of the URLs we want to track
  if (urlsToTrack.includes(details.url)) {
    // Calculate the total time the user spent on the page
    const totalTime = Math.round((Date.now() - startTime) / 60000);

    // Send a POST request to the API with the total time and page URL
    axios.post(data.url + '/test', {
      totalTime,
      pageUrl: details.url
    })
      .then(response => {
        console.log("API post request sent successfully.");
      })
      .catch(error => {
        console.error("Error sending API post request:", error);
      });
  }
});
