import { Injectable } from '@angular/core'

const localUrl = 'http://localhost:3200'
const serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api'

const url = serverUrl

@Injectable()
export class TrackService {
  findAllTracks = () =>
    fetch(`${url}/tracks`)
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

  addAudioSource = (track) =>
    fetch(`${url}/tracks`, {
      "method": "POST",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(track)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

  deleteTrack = (trackId) =>
    fetch(`${url}/tracks/${trackId}`, {
      "method": "DELETE"
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))
}
