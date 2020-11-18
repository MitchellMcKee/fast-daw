import { Injectable } from '@angular/core'

const url = 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q='

@Injectable()
export class youTubeSearchService {
  getYouTubeSearchResults = (searchQuery) =>
    fetch(`${url}${searchQuery}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "f6e38a949amsha239c20f3b73d6bp1e838djsn06f53e328978",
        "x-rapidapi-host": "youtube-search-results.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))
}