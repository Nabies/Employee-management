import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';




const routes: Routes = [
  {path:   '',redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'dashboard', component:EmployeeDashboardComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [ RouterModule ]
})
export class AppRoutingModule { }


