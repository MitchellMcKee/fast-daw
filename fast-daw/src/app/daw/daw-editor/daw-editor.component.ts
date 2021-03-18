import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioContextService } from 'src/services/audio-context-service';
import { FileService } from 'src/services/file-service';
import { ProjectService } from 'src/services/project-service';
import { TrackService } from 'src/services/track-service';
import { HostListener } from "@angular/core";
import { faPause, faStop, faPlay, faUpload } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-daw-editor',
  templateUrl: './daw-editor.component.html',
  styleUrls: ['./daw-editor.component.scss']
})
export class DawEditorComponent implements OnInit {

  tracks = [
    {
      "trackOrder": 0,
      "trackName": "Track Name",
      "selectedFilename": "Filename",
      "offset": 0,
      "volume": 0
    }
  ]

  projectId:string = ''
  projectTitle:string = 'New Project'
  file:any
  currTrackNum:number = 0
  started:boolean = false
  errorMessage:String = ''
  screenWidth:number

  pauseIcon = faPause
  playIcon = faPlay
  stopIcon = faStop

  constructor(
    private audioContextService: AudioContextService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tracks = []
    if(this.route.snapshot.paramMap.get('projectId')) {
      this.projectId = this.route.snapshot.paramMap.get('projectId')
      this.loadProject()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  updateCurrTrackNum = () => {
    this.tracks.forEach(track => {
      if(this.currTrackNum <= track.trackOrder) {
        this.currTrackNum = track.trackOrder + 1
      }
    })
  }

  loadProject = () => {
    this.stopAudio()
    if(this.projectId && this.projectId !== '') {
      this.projectService.getProjectById(this.projectId)
        .then(response => {
          if(response.error) {
            this.projectTitle = 'Could not load project'
          } else {
            response.tracks.forEach(track => {
              this.loadTrack(track)
            })
          }
        })
    }
  }

  loadTrack = (track) => {
    var loadedTrack = {
      "trackOrder": track.trackOrder,
      "trackName": track.trackName,
      "selectedFilename": track.selectedFilename,
      "offset": track.offset,
      "volume": track.volume
    }
    this.tracks.push(loadedTrack)
  }

  addTrack = () => {
    this.updateCurrTrackNum()
    var track = {
      "trackOrder": this.currTrackNum,
      "trackName": "Track Name",
      "selectedFilename": "Filename",
      "offset": 0,
      "volume": 0.75
    }
    this.tracks.push(track)
    this.updateCurrTrackNum()
  }

  startAudio = () => {
    this.audioContextService.startAudio()
    this.started = true
  }

  stopAudio = () => {
    this.audioContextService.stopAudio()
    this.started = false
  }

  playAudio = () => this.audioContextService.playAudio()
  pauseAudio = () => this.audioContextService.pauseAudio()
}
