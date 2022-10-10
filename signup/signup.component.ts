import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;


  constructor(private fb: FormBuilder,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm= this.fb.group(
      {
        fullname:['',Validators.required],
        mobile:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        
      }
    )
  }
  signUp()
  {
    this.http.post<any>("http://localhost:3000/signUpUsers",this.signupForm.value)
    .subscribe(res=>{
      alert("signup sucessfully!");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong");
    })
  }

}
