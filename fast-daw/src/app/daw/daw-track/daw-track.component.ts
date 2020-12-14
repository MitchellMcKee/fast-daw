import { Component, Input, OnInit } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';
import { TrackService } from 'src/services/track-service';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  @Input() trackOrder: number = 0
  @Input() trackName:string = 'New Track'
  @Input() selectedFilename:string = ''
  @Input() offset:number = 0
  @Input() volume:number = 0.75

  muted:boolean = false
  editingTrackName:boolean = false
  audioSources = [{
    'name': '',
    'filename': ''
  }]

  constructor(
    private audioContextService: AudioContextService,
    private trackService: TrackService
  ) { }

  ngOnInit(): void {
    this.updateAudioSources()
  }

  updateAudioSources = () => {
    this.trackService.findAllTracks()
      .then(response => {
        this.audioSources = response
      })
  }

  editName = () => this.editingTrackName = !this.editingTrackName

  selectAudioTrack = () => {
    this.audioContextService.updateAudioTrackSource(this.trackOrder, this.selectedFilename)
    this.updateAudioSources
  }

  changeVolume = () => {
    this.audioContextService.updateAudioTrackGain(this.trackOrder, this.volume)
    this.muted = false
  }

  mute = () => {
    this.audioContextService.updateAudioTrackGain(this.trackOrder, 0)
    this.muted = true
  }

  changeOffset = () => {
    this.audioContextService.setAudioTrackOffset(this.trackOrder, 0.5)
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
