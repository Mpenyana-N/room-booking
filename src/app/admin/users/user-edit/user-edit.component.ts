import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'mn-user-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{
  message!: string;
  @Input({required: true}) user!: User | any;

  userForm!: User | any
  password!: string;
  password2!: string;

  isPasswordValid = false

  ngOnInit(): void {
    this.userForm = Object.assign({}, this.user);

  }

  constructor(private dataService: DataService,
              private router: Router) {
  }

  onSubmit() {
    if (this.userForm.id == null) {
      this.dataService.addNewUser(this.userForm, this.password).subscribe((user) =>{
        this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}})
      })


    } else {
      this.dataService.updateUser(this.userForm).subscribe((user) => {
        this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}})
      });
    }
  }

  checkPasswordValid() {
    this.isPasswordValid = this.password.trim().length > 0;
  }

}
