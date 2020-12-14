import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudioContextService } from 'src/services/audio-context-service';
import { FileService } from 'src/services/file-service';
import { ProjectService } from 'src/services/project-service';
import { TrackService } from 'src/services/track-service';

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

  constructor(
    private audioContextService: AudioContextService,
    private fileService: FileService,
    private projectService: ProjectService,
    private trackService: TrackService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tracks = []
    if(this.route.snapshot.paramMap.get('projectId')) {
      this.projectId = this.route.snapshot.paramMap.get('projectId')
      this.loadProject()
      this.updateCurrTrackNum()
    }
  }

  updateCurrTrackNum = () => {
    this.tracks.forEach(track => {
      if(this.currTrackNum <= track.trackOrder) {
        this.currTrackNum = track.trackOrder + 1
      }
    })
  }

  loadProject = () => {
    if(this.projectId !== '') {
      this.projectService.getProject(this.projectId)
        .then(response => {
          if(response.error) {
            this.projectTitle = 'Could not load project'
          } else {
            response.tracks.foreach(track => {
              this.loadTrack(track)
            })
          }
        })
    }
  }

  saveProject = () => {
    if(this.projectId !== '') {
      const updatedProject = {
        "name": this.projectTitle,
        "tracks": this.tracks
      }
      this.projectService.updateProject(this.projectId, updatedProject)
        .then(response => {
          if(response.error) {
            console.log("Could not save project: " + response.error)
          } else {
            console.log("Project Saved")
          }
        })
    }
  }

  loadTrack = (trackOrder) => {
    this.trackService.getTrack(trackOrder)
      .then(response => {
        var track = {
          "trackOrder": response.trackOrder,
          "trackName": response.trackName,
          "selectedFilename": response.selectedFilename,
          "offset": response.offset,
          "volume": response.volume
        }
        this.tracks.push(track)
      })
  }

  onFileChange = (event) => {
    this.file = event.target.files[0]
  }

  uploadFile = () => {
    const formData = new FormData()
    formData.append('audioFile', this.file)
    this.fileService.uploadFile(formData)
      .then(response => {
        this.trackService.addAudioSource(response)
      })
  }

  addTrack = () => {
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
  stopAudio = () => this.audioContextService.stopAudio()

  playAudio = () => this.audioContextService.playAudio()
  pauseAudio = () => this.audioContextService.pauseAudio()

}
