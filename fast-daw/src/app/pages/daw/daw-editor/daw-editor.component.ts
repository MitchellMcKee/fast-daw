import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioContextService } from 'src/services/audio-context-service';
import { HostListener } from "@angular/core";
import { faPause, faStop, faPlay, faBars, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { UITrack } from 'src/models/daw-editor.models';


@Component({
  selector: 'app-daw-editor',
  templateUrl: './daw-editor.component.html',
  styleUrls: ['./daw-editor.component.scss']
})
export class DawEditorComponent implements OnInit {

  tracks:UITrack[] = []
  file:any
  currTrackNum:number = 0
  started:boolean = false
  errorMessage:String = ''
  screenWidth:number
  openMenu:boolean = false

  barsIcon = faBars
  chevronUpIcon = faChevronUp
  pauseIcon = faPause
  playIcon = faPlay
  stopIcon = faStop

  constructor(
    private audioContextService: AudioContextService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tracks = []
    this.addTrack()

    // Add check for shareable link parameters
    // if(this.route.snapshot.paramMap.get('projectId')) {
    //   this.projectId = this.route.snapshot.paramMap.get('projectId')
    //   this.loadProject()
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  addTrack = () => {
    var track: UITrack = {
      "trackId": this.currTrackNum++,
      "selectedFilename": "filename",
      "offset": 0,
      "volume": 0.75
    }
    this.tracks.push(track)
  }

  deleteTrack = (trackId) => {
    this.tracks = this.tracks.filter(track => track.trackId !== trackId)
  }

  checkIfLoading = () => this.audioContextService.checkIfLoading()

  startAudio = () => {
    if (!this.audioContextService.checkIfLoading()) {
      this.audioContextService.startAudio()
      this.started = true
    }
  }

  stopAudio = () => {
    this.audioContextService.stopAudio()
    this.started = false
  }

  playAudio = () => this.audioContextService.playAudio()
  pauseAudio = () => this.audioContextService.pauseAudio()

  ngOnDestroy(): void {
    this.audioContextService.stopAudio()
  }
}
