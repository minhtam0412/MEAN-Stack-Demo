import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup = new FormGroup({});
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {
  }

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e?: any) {
    this.employeeForm?.get('designation')?.setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm?.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("-> this.employeeForm.value", this.employeeForm.value);
    if (!this.employeeForm?.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
