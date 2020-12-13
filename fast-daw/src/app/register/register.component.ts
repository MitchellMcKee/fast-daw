import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: ''
  password: ''
  errorMessage: ''

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
      .then(message => {
        if(message.validationMessage === "user created") {
          this.router.navigate(['/account'])
        } else {
          this.errorMessage = message.validationMessage
        }
      })
  }
}
