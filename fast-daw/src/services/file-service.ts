import { Injectable } from '@angular/core'

const localUrl = 'https://localhost:3200/upload'
const serverUrl = 'https://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api/upload'

const url = serverUrl

@Injectable()
export class FileService {

  uploadFile = (formData) =>
    fetch(url, {
      "method": "POST",
      "body": formData
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

  getFile = (filename) => {
    if(filename !== 'filename') {
      fetch(`${url}/${filename}`)
        .then(response => response.json)
        .catch(error => console.log("network error:" + error))
    }
  }


}
