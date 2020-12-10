import { Injectable } from '@angular/core'

const url = 'http://localhost:3200/api/users'

@Injectable()
export class UserService {
  checkUserCredentials = (credentials) =>
    fetch(`${url}/${credentials.username}`, {
      "method": "PUT",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(credentials)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

}