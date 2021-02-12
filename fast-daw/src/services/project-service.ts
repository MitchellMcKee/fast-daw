import { Injectable } from '@angular/core'

const localUrl = 'http://localhost:3200/projects'
const serverUrl = 'http://ec2-18-216-125-59.us-east-2.compute.amazonaws.com/api/projects'

const url = localUrl

@Injectable()
export class ProjectService {
  addProject = (project) =>
    fetch(url, {
      "method": "POST",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(project)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))    

  getProjectById = (projectId) =>
    fetch(`${url}/${projectId}`)
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))

  getProjects = () =>
    fetch(`${url}`)
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))
      
  updateProject = (projectId, project) =>
    fetch(`${url}/${projectId}`, {
      "method": "PUT",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(project)
    })
      .then(response => response.json())
      .catch(error => console.log("network error:" + error))
}