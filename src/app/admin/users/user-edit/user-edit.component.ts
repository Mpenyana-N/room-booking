import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'mn-user-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnDestroy{
  message!: string;
  @Input({required: true}) user!: User | any;

  userForm!: User | any
  password!: string;
  password2!: string;

  isNameValid = false;
  isPasswordValid = false;
  passwordsMatch = false;

  resetUserFormSub: typeof Subscription | any = Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {
  }


  ngOnInit(): void {
    this.initializeUserForm();
    this.formResetService.resetUserFormEvent.subscribe((user) => {
      this.user = user;
      this.initializeUserForm()
    })
  }

  ngOnDestroy(): void {
    if(!this.resetUserFormSub) {
      this.resetUserFormSub.unsubscribe();
    }

  }

  initializeUserForm() {
    this.userForm = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordIsValid();
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
      this.isNameValid = true;
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
