import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioContextService } from 'src/services/audio-context-service';
import { TrackService } from 'src/services/track-service';
import { FileService } from 'src/services/file-service';
import { faPause, faStop, faPlay, faUpload} from '@fortawesome/free-solid-svg-icons';
import { UITrack, audioSource } from 'src/models/daw-editor.models';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-daw-editor',
  templateUrl: './daw-editor.component.html',
  styleUrls: ['./daw-editor.component.scss']
})
export class DawEditorComponent implements OnInit {

  tracks:UITrack[] = []
  audioSources:audioSource[] = []
  generatedLink:string = ''
  file:any
  currTrackNum:number = 0
  started:boolean = false

  pauseIcon = faPause
  playIcon = faPlay
  stopIcon = faStop
  uploadIcon = faUpload

  constructor(
    private audioContextService: AudioContextService,
    private fileService: FileService,
    private trackService: TrackService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tracks = []
    this.updateAudioSources()

    if(this.router.url !== '/') {
      this.preloadTracks(this.router.url.replace('/preload/', ''))
    } else {
      this.addTrack()
    }
  }

  updateAudioSources = () => {
    this.trackService.findAllTracks()
      .then(response => {
        this.audioSources = response
      })
  }

  preloadTracks = (preloadValues:string) => {
    const trackValues = preloadValues.split('&')
    console.log(trackValues)
    for(let i = 0; i <= trackValues.length - 3; i += 3) {
      let track: UITrack = {
        "trackId": this.currTrackNum++,
        "selectedFilename": trackValues[i],
        "offset": 0,
        "volume": 0.75
      }
      if(+trackValues[i + 1] > 0) {
        track.offset = +trackValues[i+1]
      }
      if(+trackValues[i + 2] >= 0 && +trackValues[i + 2] <= 1) {
        track.volume = +trackValues[i + 2]
      }
      this.tracks.push(track)
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoadingMessageDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  generateLink = () => {
    // localUrl - http://localhost:4200/preload/
    let result = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/preload/'
    this.generatedLink = ''
    if(this.tracks.length > 0) {
      console.log(this.audioContextService.tracks)
      this.audioContextService.tracks.forEach(track => {
        result += track.filename + '&' + track.offset + '&' + track.gain + '&'
      })
      this.generatedLink = result
    } else {
      this.generatedLink = 'There are currently no tracks to save'
    }
    console.log(this.generatedLink)
  }

  addTrack = () => {
    let track: UITrack = {
      "trackId": this.currTrackNum++,
      "selectedFilename": "filename",
      "offset": 0,
      "volume": 0.75
    }
    this.tracks.push(track)
  }

  deleteTrack = (trackId:number) => {
    this.tracks = this.tracks.filter(track => track.trackId !== trackId)
  }

  checkIfLoading = () => this.audioContextService.checkIfLoading()

  startAudio = () => {
    if (!this.audioContextService.checkIfLoading()) {
      this.audioContextService.startAudio()
      this.started = true
    } else {
      this.openDialog()
    }
  }

  stopAudio = () => {
    this.audioContextService.stopAudio()
    this.started = false
  }

  playAudio = () => this.audioContextService.playAudio()
  pauseAudio = () => this.audioContextService.pauseAudio()

  onFileChange = (event) => {
    this.file = event.target.files[0]
  }

  uploadFile = () => {
    if(this.verifyFileType()) {
      const formData = new FormData()
      formData.append('audioFile', this.file)
      this.fileService.uploadFile(formData)
        .then(response => this.trackService.addAudioSource(response))
        .then(() => this.updateAudioSources())
    } else {
      console.log("file type is not mp3")
    }
  }

  verifyFileType = () => this.file?.type === 'audio/mpeg'

  ngOnDestroy(): void {
    this.audioContextService.stopAudio()
  }
}

@Component({
  selector: 'loading-message-dialog',
  templateUrl: './loading-message-dialog.html',
})
export class LoadingMessageDialog {}
