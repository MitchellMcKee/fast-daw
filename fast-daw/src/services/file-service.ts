import { Injectable } from '@angular/core'

const localUrl = 'http://localhost:3200/upload'
const serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api/upload'

const url = localUrl

@Injectable()
export class FileService {
  

  uploadFile = (file) => {
    const formData = new FormData()
    formData.append('audioFile', file)

    fetch(url, {
      "method": "POST",
      "body": formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log("network error:" + error))    
  }

  getFile = (filename) => {
    fetch(`${url}/${filename}`)
      .then(response => response.json)
      .catch(error => console.log("network error:" + error))
  }
    

}