import { Component, OnInit } from '@angular/core';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isSignedIn: boolean = false;

  constructor(
    private authenticationHelper: AuthenticationHelper
  ) { }
  //método executado quando o componente é renderizado
  ngOnInit(): void {
    this.isSignedIn = this.authenticationHelper.isSignedIn();
  }
}