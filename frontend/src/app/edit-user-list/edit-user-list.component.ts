import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-user-list',
  templateUrl: './edit-user-list.component.html',
  styleUrls: ['./edit-user-list.component.scss']
})
export class EditUserListComponent implements OnInit {

  updateForm: FormGroup;
  Users: any = [];
  getId: any

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetUserById(this.getId).subscribe((res: { fullname: string, email: string, phno: string, code: string }) => {
      this.updateForm.value.fullname = res.fullname // working
      this.updateForm.value.email = res.email // working
      this.updateForm.value.phno = res.phno // working
      this.updateForm.value.code = res.code // working
      this.Users = res
    });
    this.updateForm = this.fb.group({
      fullname!: [''],
      email!: [''],
      phno!: [''],
      code!: [''],
    })
    console.log(this.updateForm.value.fullname)
  }
  ngOnInit(): void {

  }

  onUpdateForm(id: any): any {
    this.userService.editUser(this.updateForm.value, id)
      .subscribe(() => {
        alert("User updated successfully!")
        this.ngZone.run(() => this.router.navigateByUrl('/userslist'))
      }, (error) => {
        console.log(error)
      })
  }

}
