import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { AudioContextService } from 'src/services/audio-context-service';
import { FileService } from 'src/services/file-service';
import { ProjectService } from 'src/services/project-service';
import { TrackService } from 'src/services/track-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  projectId:string = ''
  projectTitle:string = 'New Project'
  file:any
  errorMessage:String = ''

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
      if(this.route.snapshot.paramMap.get('projectId')) {
        this.projectId = this.route.snapshot.paramMap.get('projectId')
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
        }
      }
      else {
        this.errorMessage = 'Cannot save without a project name'
      }
    }
  }

  onFileChange = (event) => {
    this.file = event.target.files[0]
  }

  uploadFile = () => {
    if(this.verifyFileType()) {
      const formData = new FormData()
      formData.append('audioFile', this.file)
      this.fileService.uploadFile(formData)
        .then(response => {
          this.trackService.addAudioSource(response)
        })
    } else {
      console.log("file type is not mp3")
    }
  }

  verifyFileType = () => this.file?.type === 'audio/mpeg'

}
