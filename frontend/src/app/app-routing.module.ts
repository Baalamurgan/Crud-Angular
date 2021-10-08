import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserListComponent } from './edit-user-list/edit-user-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{ path: 'userform', component: UsersComponent }, { path: 'updateform/:id', component: EditUserListComponent }, { path: 'userslist', component: UserListComponent }, { path: '', redirectTo: 'userslist', pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
