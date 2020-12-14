import { Component, Input, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  @Input() trackNum: number

  trackName:string = 'Track Name'
  trackSelection:string = ''
  volume:number = 0.75
  muted:boolean = false
  offset:number = 0
  editingTrackName:boolean = false

  constructor(private audioContextService: AudioContextService) { }

  ngOnInit(): void {
  }

  editName = () => this.editingTrackName = !this.editingTrackName

  selectAudioTrack = () => {
    this.audioContextService.updateAudioTrackSource(this.trackNum, "http://localhost:3200/files/f1b2d59fdbaf928fd37f28e70cf4a81f.mp3")
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
