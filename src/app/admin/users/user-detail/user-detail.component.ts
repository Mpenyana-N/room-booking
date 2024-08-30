import {Component, Input} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'mn-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  constructor(private router: Router,
              private dataService: DataService) {
  }

 @Input({required: true}) user!: User;

 editUser() {
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'edit'}})
 }

 removeUser() {
   this.dataService.deleteUser(this.user.id).subscribe((next) => {
     this.router.navigate(['admin', 'users']);
   })

 }

}
