import axios from "axios";
import variableData from '../variables.json'
import { User } from "../authentication/User"
import { stringify } from "postcss";

//TODO remove token from request

export class PageVisit{
  constructor() {
    this.url = variableData.url + '/api/v1/page-visit';
    chrome.storage.local.get(['user'], function(data) {
      if (data.user) {
          const newUser = new User();
          newUser.setUserFromStorage(data.user); 
          this.user = newUser;
      }
    })
  }

  sendPageVisit(
      totalTime, 
      domain
  ) {
    chrome.storage.local.get(['user'], async function(data) {
      if (data.user) {
          const newUser = new User();
          newUser.setUserFromStorage(data.user); 

          try {
            const response = await fetch(variableData.url + "/api/v1/page-visit", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept': '*/*',
                'Authorization': 'Bearer ' + newUser.getToken(),
              },
              body: JSON.stringify({
                email: newUser.getUser().email,
                token: newUser.getToken(),
                duration: totalTime,
                url: domain,
              })
            })
            console.log(response)
          } catch (error) {
            console.log(error)
          }
      }
    })
  }
}