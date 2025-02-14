import { Component } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User= new User()

  isLoginForm = true;
  constructor(private userService: UserServiceService, private router: Router) { }
  toggleForms() {
    this.isLoginForm = !this.isLoginForm;
  }
  onRegister(){
    this.userService.registerUser(this.user).subscribe(response =>
      {console.log(this.user)
        return response}
    )
  }
  onLogin(){
    this.userService.loginUser(this.user.email,this.user.password).subscribe(response =>
      {console.log(this.user)
        alert("OK")
       // this.router.navigate(['/quiz']);
        return response}
    )
  }
}
