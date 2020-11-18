import { Injectable } from '@angular/core'

const url = 'https://youtube-to-mp32.p.rapidapi.com/yt_to_mp3?video_id='

@Injectable()
export class YouTubeDownloadService {
  getYouTubeDownloadLink = (videoId) =>
    fetch(`${url}${videoId}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "f6e38a949amsha239c20f3b73d6bp1e838djsn06f53e328978",
        "x-rapidapi-host": "youtube-to-mp32.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))
}