import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {


employeeModelObj:EmployeeModel=new EmployeeModel();
employeeData !: any;
showAdd!: boolean;
showUpadte!: boolean;

formValue !: FormGroup;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
      doj: ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpadte=false;
  }

  postEmployeeDetails()
  {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.doj = this.formValue.value.doj;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Sucessfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    },
    _err=>{
      alert("Someting went wrong");
    })
  }

  getAllEmployee()
  {
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;

    })
  }

  deleteEmployee(row : any)
  {
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }

  onEdit(row: any)
  {
    this.showAdd=false;
    this.showUpadte=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['doj'].setValue(row.doj);
  }

  updateEmployeeDetails()
  {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.doj = this.formValue.value.doj;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Sucessfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
    })
  }

}
