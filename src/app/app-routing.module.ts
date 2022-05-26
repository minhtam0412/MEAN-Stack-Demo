import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {EmployeeCreateComponent} from "./components/employee-create/employee-create.component";
import {EmployeeEditComponent} from "./components/employee-edit/employee-edit.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'create-employee', component: EmployeeCreateComponent},
  {path: 'edit-employee/:id', component: EmployeeEditComponent},
  {path: 'employees-list', component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
