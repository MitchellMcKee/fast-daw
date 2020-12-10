import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: ''
  password: ''
  errorMessage: ''

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  checkCredentials = () => {
    const credentials = {
      "username": this.username,
      "password": this.password
    }

    this.userService.checkUserCredentials(credentials)
      .then(message => {
        if(message.validationMessage === "verified") {
          this.router.navigate(['/account'])
        } else {
          this.errorMessage = message.validationMessage
        }
      })
      
  }

}
