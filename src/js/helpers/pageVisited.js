import axios from "axios";
import data from '../variables.json'

export class PageVisit{
    sendPageVisit(
        totalTime, 
        domain
    ) {
    axios.post(data.url + '/test', {
          totalTime,
          pageUrl: domain
        })
          .then(response => {
            console.log("API post request sent successfully.");
          })
          .catch(error => {
            console.error("Error sending API post request:", error);
          });
    }
}