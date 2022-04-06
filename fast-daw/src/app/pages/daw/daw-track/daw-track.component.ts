import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AudioContextService } from 'src/services/audio-context-service';
import { TrackService } from 'src/services/track-service';
import { faCheckSquare, faEdit, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { audioSource } from 'src/models/daw-editor.models';

@Component({
  selector: 'app-daw-track',
  templateUrl: './daw-track.component.html',
  styleUrls: ['./daw-track.component.scss']
})
export class DawTrackComponent implements OnInit {

  @Input() trackId: number
  @Input() selectedFilename:string
  @Input() offset:number
  @Input() volume:number

  @Output() deleteTrackEmitter: EventEmitter<any> = new EventEmitter()

  muted:boolean = false
  editingTrackName:boolean = false
  newOffset:number = 0
  audioSources:audioSource[] = []

  muteIcon = faVolumeMute
  volumeIcon = faVolumeUp
  editIcon = faEdit
  checkIcon = faCheckSquare

  constructor(
    private audioContextService: AudioContextService,
    private trackService: TrackService
  ) { }

  ngOnInit(): void {
    this.updateAudioSources()
    this.selectAudioTrack()
    this.changeVolume()
    this.newOffset = this.offset
    this.changeOffset()
  }

  updateAudioSources = () => {
    this.trackService.findAllTracks()
      .then(response => {
        this.audioSources = response
      })
  }

  editName = () => this.editingTrackName = !this.editingTrackName

  selectAudioTrack = () => {
    this.audioContextService.stopAudio()
    this.audioContextService.updateAudioTrackSource(this.trackId, this.selectedFilename)
  }

  changeVolume = () => {
    this.audioContextService.updateAudioTrackGain(this.trackId, this.volume)
    this.muted = false
  }

  mute = () => {
    this.audioContextService.updateAudioTrackGain(this.trackId, 0)
    this.muted = true
  }

  changeOffset = () => {
    if(this.newOffset < 0) {
      this.newOffset = 0
    }
    this.offset += (this.newOffset - this.offset)
    this.audioContextService.setAudioTrackOffset(this.trackId, this.offset)
  }

  deleteTrackFromDatabase = () => {
    if(this.selectedFilename !== '') {
      this.trackService.deleteTrack(this.selectedFilename)
      this.selectedFilename = ''
      this.audioContextService.disconnectAudioTrack(this.trackId)
    }
  }

  deleteTrack = () => {
    this.audioContextService.disconnectAudioTrack(this.trackId)
    this.deleteTrackEmitter.emit()
  }
}
