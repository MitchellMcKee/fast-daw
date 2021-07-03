import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username:string = ''
  password:string = ''
  errorMessage: string

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser = () => {
    const credentials = {
      "username": this.username,
      "password": this.password
    }

    this.userService.addUser(credentials)
      .then(response => {
        if(response.username && response.username === credentials.username
           && response.password && response.password === credentials.password) {
          this.errorMessage = `${response.username} has been created, you may now log in`
        } else {
          this.errorMessage = 'An account with that username has already been created'
        }
      })
  }

  goToLogin = () => {
    this.router.navigate(['/login'])
  }
}
