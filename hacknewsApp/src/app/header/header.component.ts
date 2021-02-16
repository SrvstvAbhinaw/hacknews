import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  LoggedInUser : User;

  constructor(private auth : AuthService,private router: Router) { 
    this.LoggedInUser = this.auth.currentUserValue;
    console.log(this.LoggedInUser);

    if(this.auth.currentUserValue) {
      this.auth.loggedUser = true;
    } else {
      this.auth.loggedUser = false;
    }
  }

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  logoutUser() {
    this.auth.logout();
    this.LoggedInUser = this.auth.currentUserValue;
    console.log(this.LoggedInUser);
    location.reload();
  }

}

