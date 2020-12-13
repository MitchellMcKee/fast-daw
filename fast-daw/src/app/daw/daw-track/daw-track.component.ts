import { Component, Input, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  @Input() trackNum: number

  trackName = 'Track Name'
  trackSelection = ''
  volume = 0.75
  muted = false
  offset = 0
  editingTrackName = false

  proxyurl = "https://cors-anywhere.herokuapp.com/";
  url1 = "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"; 
  url2 = "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav";

  constructor(private audioContextService: AudioContextService) { }

  ngOnInit(): void {
  }

  editName = () => this.editingTrackName = !this.editingTrackName

  selectAudioTrack = () => {
    if(this.trackSelection === 'imperialMarch') {
      this.audioContextService.updateAudioTrackSource(this.trackNum, this.proxyurl + this.url1)
    } else {
      this.audioContextService.updateAudioTrackSource(this.trackNum, this.proxyurl + this.url2)
    }
  }

  changeVolume = () => {
    this.audioContextService.updateAudioTrackGain(this.trackNum, this.volume)
    this.muted = false
  }

  mute = () => {
    this.audioContextService.updateAudioTrackGain(this.trackNum, 0)
    this.muted = true
  }

  changeOffset = () => {
    this.audioContextService.setAudioTrackOffset(this.trackNum, 0.5)
  }

  increaseOffset = () => {
    this.offset += 0.5
    this.changeOffset()
  }

  decreaseOffset = () => {
    this.offset < 0.5 ? this.offset = 0 : this.offset -= 0.5
    this.changeOffset
  }

}
