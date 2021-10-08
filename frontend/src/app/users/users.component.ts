import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  Users: any = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      fullname: [''],
      email: [''],
      phno: [''],
      code: ['']
    })
  }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users = res;
    });
  }

  onCreateUser() {
    console.log(this.userForm)
    this.userService.createUser(this.userForm.value)
      .subscribe(() => {
        console.log("User added successfully!");
        alert("User added successfully!")
        this.ngZone.run(() => this.router.navigateByUrl('/userslist'))
      }, (error) => {
        console.log(error)
      })
  }
}
