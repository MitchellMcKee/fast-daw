import { Injectable } from '@angular/core'

const localUrl = 'http://localhost:3200/users'
const serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api/users'

@Injectable()
export class UserService {
  checkUserCredentials = (credentials) =>
    fetch(serverUrl, {
      "method": "PUT",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(credentials)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

  addUser = (credentials) =>
    fetch(serverUrl, {
      "method": "POST",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(credentials)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))    

}