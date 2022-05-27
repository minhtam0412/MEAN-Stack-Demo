import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from "./_helpers/auth.guard";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./client/client.module').then(m => {
      return m.ClientModule
    })
  },
  {
    path: 'administrator',
    component: AdminDashboardComponent,
    loadChildren: () => import('../app/admin/admin.module').then(m => {
      return m.AdminModule
    }), canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
