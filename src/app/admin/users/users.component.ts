import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'mn-users',
  standalone: true,
  imports: [UserDetailComponent, UserEditComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users!: Array<User>;
  selectedUser!: User | any;
  action!: string | any


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) {
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((next) => {
      this.users = next;
    });

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        this.selectedUser = this.users.find((user) => {
          return user.id === +id;
        });
      }
    })
  }

  setUser(id: any) {
    this.router.navigate(['admin', 'users'], {queryParams: {id, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {queryParams: { action: 'add'}});
    this.formResetService.resetUserFormEvent.emit(this.selectedUser);
  }

}
