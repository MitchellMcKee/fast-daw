import { Injectable } from '@angular/core'

const localUrl = 'https://localhost:3200/users'
const serverUrl = 'https://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api/users'

const url = serverUrl

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

  updateUser = (userId, credentials) =>
    fetch(`${url}/${userId}`, {
      "method": "PUT",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(credentials)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))
}
