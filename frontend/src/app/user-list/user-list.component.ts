import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { UserService } from '../shared/user.service';
import { users } from '../users/users';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  updateForm: FormGroup;
  Users: any = [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    public fb: FormBuilder,
  ) {
    this.updateForm = this.fb.group({
      fullname: [''],
      email: [''],
      phno: [''],
      code: ['']
    })
  }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      this.Users = res;
    });
  }

  onDeleteUser(id: any, i: any) {
    console.log(id);
    if (window.confirm('Sure you want to delete the user?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
      })

    }
  }
}