import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  signedIn:boolean

  userIcon = faUser

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userId').length > 0) {
      this.signedIn = true
    }
  }

  logout = () => {
    localStorage.setItem('userId', '')
    this.router.navigate(['/login'])
  }

  goToAccount = () => {
    this.router.navigate(['/account'])
  }
}
