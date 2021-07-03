import { Component, OnInit } from '@angular/core';
import { YouTubeDownloadService } from 'src/services/youtube-download-service';

@Component({
  selector: 'app-youtube-download',
  templateUrl: './youtube-download.component.html',
  styleUrls: ['./youtube-download.component.scss']
})
export class YoutubeDownloadComponent implements OnInit {

  value = ''
  youTubeSearchResults = []
  downloadLink = ''
  downloadTitle = ''

  constructor(private youTubeDownloadService: YouTubeDownloadService) { }

  ngOnInit(): void {
  }

  getYouTubeDownloadLink = () => {
    this.downloadTitle = 'Loading...';
    this.downloadLink = '/';
    const videoId = this.getYouTubeId(this.value);
    this.youTubeDownloadService.getYouTubeDownloadLink(videoId)
      .then(result => {
        this.downloadLink = result.Download_url;
        this.downloadTitle = result.Title;
      })
  }

  getYouTubeId = (url) => {
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
      return ID;
  }
  
}
