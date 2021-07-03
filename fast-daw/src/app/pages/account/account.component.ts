import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/services/project-service';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  signedIn:boolean
  username:string
  password:string
  projects = []
  editing:boolean = false
  newUsername:string
  newPassword:string
  errorMessage:string

  constructor(
    private router: Router,
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('userId').length > 0) {
      this.signedIn = true
      this.userService.getUser(localStorage.getItem('userId'))
        .then(credentials => {
          this.username = credentials.username
          this.password = credentials.password
          this.newPassword = this.password
          this.newUsername = this.username
        })
      this.projectService.getProjects()
        .then(projects => {
          projects.forEach(project => {
            if(project.editors?.includes(localStorage.getItem('userId'))) {
              this.projects.push({
                "name": project.name,
                "projectId": project._id
              })
            }
          })
        })
    }
  }

  goToProject = (projectId) => {
    this.router.navigate([`daw/${projectId}`])
  }

  deleteProject = (projectId) => {
    this.projectService.deleteProject(projectId)
  }

  edit = () => {
    this.newUsername = this.username
    this.newPassword = this.password
    this.errorMessage = ''
    this.editing = !this.editing
  }

  changeCredentials = () => {
    if(this.newUsername.length < 1
       || this.newPassword.length < 1) {
        this.errorMessage = "Missing New Username/Password"
    } else {
      this.username = this.newUsername
      this.password = this.newPassword
      const credentials = {
        "username": this.username,
        "password": this.password
      }
      this.userService.updateUser(localStorage.getItem('userId'), credentials)
      this.edit()
    } 
  }

  goToLogin = () => {
    localStorage.setItem('userId', '')
    this.router.navigate(['/login'])
  }

}
