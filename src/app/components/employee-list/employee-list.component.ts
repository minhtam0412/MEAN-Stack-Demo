import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee: any = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.readEmployee();
  }


  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    })
  }

  removeEmployee(employee: any, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )
    }
  }
}
