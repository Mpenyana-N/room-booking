import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditComponent} from "./user-edit/user-edit.component";

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
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((next) => {
      this.users = next;
    });

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const action = params['action'];
      if (id) {
        this.selectedUser = this.users.find((user) => {
          return user.id === +id;
        });
        this.action = action
      }

    })
  }

  setUser(id: any) {
    this.router.navigate(['admin', 'users'], {queryParams: {id, action: 'view'}});
  }

}
