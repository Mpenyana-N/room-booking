import {Component, Input} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'mn-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  constructor(private router: Router) {
  }

 @Input({required: true}) user!: User;

 editUser() {
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'edit'}})
 }

}
