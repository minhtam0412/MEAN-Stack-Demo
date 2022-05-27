import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeCreateComponent} from "./employee-create/employee-create.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'employee-list', pathMatch: 'full'
  },
  {
    path: 'employee-list', component: EmployeeListComponent
  },
  {path: 'create-employee', component: EmployeeCreateComponent},
  {path: 'edit-employee/:id', component: EmployeeEditComponent},
  {path: 'employees-list', component: EmployeeListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
