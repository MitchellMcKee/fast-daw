import { Component, Input, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  @Input() trackNum: number

  name = 'Track Name'
  trackSelection = ''

  proxyurl = "https://cors-anywhere.herokuapp.com/";
  url1 = "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"; 
  url2 = "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav";

  constructor(private audioContextService: AudioContextService) { }

  ngOnInit(): void {
  }

  selectAudioTrack = () => {
    if(this.trackSelection === 'imperialMarch') {
      this.audioContextService.updateAudioTrackSource(this.trackNum, this.proxyurl + this.url1)
    } else {
      this.audioContextService.updateAudioTrackSource(this.trackNum, this.proxyurl + this.url2)
    }
  }

  increaseAudioTrackOffset = () => {
    if(this.trackSelection === 'imperialMarch') {
      this.audioContextService.increaseAudioTrackOffset(this.trackNum, 0.1)
    } else {
      this.audioContextService.increaseAudioTrackOffset(this.trackNum, 0.1)
    }
  }

  decreaseAudioTrackOffset = () => {
    if(this.trackSelection === 'imperialMarch') {
      this.audioContextService.decreaseAudioTrackOffset(this.trackNum, 0.1)
    } else {
      this.audioContextService.decreaseAudioTrackOffset(this.trackNum, 0.1)
    }
  }

}
