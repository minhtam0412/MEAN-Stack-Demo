import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./client/client.module').then(m => {
      return m.ClientModule
    })
  },
  {
    path: 'administrator', loadChildren: () => import('../app/admin/admin.module').then(m => {
      return m.AdminModule
    })
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // {path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  // {path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
