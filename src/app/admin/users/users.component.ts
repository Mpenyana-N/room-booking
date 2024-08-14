import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'mn-users',
  standalone: true,
  imports: [UserDetailComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users!: Array<User>;
  selectedUser!: User | any;
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.users = this.dataService.users;
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.selectedUser = this.users.find((user) => {
          return user.id === +id;
        });
      }
    })
  }

  setUser(id: any) {
    this.router.navigate(['admin', 'users'], {queryParams: {id}});
  }

}
