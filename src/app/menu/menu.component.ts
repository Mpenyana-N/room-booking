import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'mn-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router) {
  }

  navigateToRooms() {
    this.router.navigate(['admin', 'rooms']);
  }

  navigateToUsers() {
    this.router.navigate(['admin', 'users']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

}
