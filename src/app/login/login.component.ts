import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private fb:FormBuilder,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {

    this.loginForm= this.fb.group(
      {
        email:['',[Validators.required,Validators.minLength(3)]],
        password:['',Validators.required]
      }
    )
  }
  login()
  {
    this.http.get<any>("http://localhost:3000/signUpUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user)
      {
        alert("Login Success :)");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }
      else{
        alert("user not found");
      }
    },err=>{
      alert("Something went wrong")
    })
  }

}
