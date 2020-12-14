import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string = ''
  password:string = ''
  errorMessage: string = ''

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
      .then(response => {
        if(response.validationMessage === 'verified') {
          localStorage.setItem("userId", response.userId)
          this.router.navigate(['/account'])
        } else {
          this.errorMessage = response.validationMessage
        }
      })
      
  }

}
