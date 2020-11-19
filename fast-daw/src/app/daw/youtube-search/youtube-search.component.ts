import { Component, OnInit } from '@angular/core';
import { YouTubeSearchService } from 'src/services/youtube-search-service';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.scss']
})
export class YoutubeSearchComponent implements OnInit {

  value = '';
  youTubeSearchResults = []

  constructor(private youTubeSearchService: YouTubeSearchService) { }

  ngOnInit(): void {
  }

  getYouTubeSearchResults = () => {
    this.youTubeSearchService.getYouTubeSearchResults(this.value)
      .then(results => this.youTubeSearchResults = results.items)
      .then(results => this.youTubeSearchResults.shift())
  }

}
