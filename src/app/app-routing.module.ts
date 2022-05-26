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
import {AuthGuard} from "./_helpers/auth.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'create-employee', component: EmployeeCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit-employee/:id', component: EmployeeEditComponent, canActivate: [AuthGuard]},
  {path: 'employees-list', component: EmployeeListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
