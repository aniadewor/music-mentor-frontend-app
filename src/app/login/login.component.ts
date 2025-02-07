import { Component } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginForm = true;
  constructor(private userService: UserServiceService) { }
  toggleForms() {
    this.isLoginForm = !this.isLoginForm;
  }
  user= {email:'', password:''}
  onRegister(){
    this.userService.registerUser(this.user).subscribe(response =>
      {console.log(response)
        return response}
    )
  }
}
