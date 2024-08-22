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

  isNameValid = false;
  isPasswordValid = false;
  passwordsMatch = false;

  ngOnInit(): void {
    this.userForm = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();
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

  checkIfNameIsValid() {
    if (this.userForm.name) {
      this.isNameValid = this.userForm.name.trim().length > 0;
    } else {
      this.isNameValid = false;
    }

  }

  checkIfPasswordIsValid() {
    if(this.userForm.id != null) {
      this.isPasswordValid = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if(this.password) {
        this.isPasswordValid = this.password.trim().length > 0;
      } else {
        this.isPasswordValid =false;
      }
    }
  }

}
