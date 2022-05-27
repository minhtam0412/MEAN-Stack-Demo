import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AuthGuard} from "../_helpers/auth.guard";

const routes: Routes = [
  {path: '', component: AdminDashboardComponent},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
