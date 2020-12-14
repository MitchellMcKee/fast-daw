import { Injectable } from '@angular/core'

const localUrl = 'http://localhost:3200/users'
const serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api/users'

const url = localUrl

@Injectable()
export class UserService {
  checkUserCredentials = (credentials) =>
    fetch(url, {
      "method": "PUT",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(credentials)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

  addUser = (credentials) =>
    fetch(url, {
      "method": "POST",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(credentials)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))    

  getUser = (userId) =>
    fetch(`${url}/${userId}`)
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))    
}