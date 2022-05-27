import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {EmployeeCreateComponent} from "./employee-create/employee-create.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule {
}
