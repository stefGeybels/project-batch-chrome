import variableData from '../variables.json';
import { User } from '../authentication/User';


export class TrackedPlatform {
    async get() {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(['user'], async function(data) {
          if (data.user) {
            const newUser = new User();
            newUser.setUserFromStorage(data.user);
  
            try {
              const response = await fetch(variableData.url + '/api/v1/plugin-dashboard', {
                headers: {
                  'Content-Type': 'application/json',
                  'Connection': 'keep-alive',
                  'Accept': '*/*',
                  'Authorization': 'Bearer ' + newUser.getToken(),
                },
              });
  
              const responseData = await response.json();
              resolve(responseData);
            } catch (error) {
              reject(error);
            }
          }
        });
      });
    }
  }