import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent
  },
  {
    path: 'user',
    component: AdminDashboardComponent,
    loadChildren: () => import('../admin/user/user.module').then(value => {
      return value.UserModule;
    })
  },
  {
    path: 'employee',
    component: AdminDashboardComponent,
    loadChildren: () => import('../admin/employee/employee.module').then(value => {
      return value.EmployeeModule;
    })
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
