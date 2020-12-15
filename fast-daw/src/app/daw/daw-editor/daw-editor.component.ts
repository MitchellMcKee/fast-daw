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
  uploadIcon = faUpload

  constructor(
    private audioContextService: AudioContextService,
    private fileService: FileService,
    private projectService: ProjectService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private router: Router
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
    if(this.projectId !== '') {
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

  createProject = () => {
    this.errorMessage = ''
    if(localStorage.getItem('userId') === ''
       || localStorage.getItem('userId') === null) {
        this.errorMessage = 'You need to login to create a project'
    } else {
      const newProject = {
        "name": "New Project",
        "editors": localStorage.getItem('userId'),
        "tracks": this.audioContextService.createProjectFile()
      }
      this.projectService.addProject(newProject)
        .then(response => this.router.navigate([`daw/${response._id}`]))
    }
  }

  saveProject = () => {
    this.errorMessage = ''
    if(localStorage.getItem('userId') === ''
       || localStorage.getItem('userId') === null) {
        this.errorMessage = 'You need to be an editor of this project to save'
    } else {
      if(this.projectId !== '') {
        const updatedProject = {
          "name": "New Project",
          "editors": localStorage.getItem('userId'),
          "tracks": this.audioContextService.createProjectFile()
        }
        this.projectService.updateProject(this.projectId, updatedProject)
          .then(response => {
            if(response) {
              console.log(response)
            } else {
              console.log("Project Saved")
            }
          })
      } else {
        this.errorMessage = 'Cannot save without a project name'
      }
    }
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
  stopAudio = () => this.audioContextService.stopAudio()

  playAudio = () => this.audioContextService.playAudio()
  pauseAudio = () => this.audioContextService.pauseAudio()

}
