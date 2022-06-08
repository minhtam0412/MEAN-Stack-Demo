import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('../admin/user/user.module').then(value => {
      return value.UserModule;
    })
  },
  {
    path: 'employee',
    loadChildren: () => import('../admin/employee/employee.module').then(value => {
      return value.EmployeeModule;
    })
  },
  {
    path: 'product', loadChildren: () => import('../admin/product/product.module').then(value => {
      return value.ProductModule
        ;
    })
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
