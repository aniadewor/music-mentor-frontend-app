import { Component } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { UserStateService } from '../service/user-state-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User= new User()
  Role = Role

  isLoginForm = true;

  login = {
    email: '',
    password: ''
  };

  register = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private userService: UserServiceService, private router: Router, private userStateService: UserStateService) {}

  toggleForms() {
    this.isLoginForm = !this.isLoginForm;
  }

  onLogin() {
    if (this.login.email && this.login.password) {
      this.userService.loginUser(
      this.user.email,
      this.user.password
      ).subscribe(response => {
        console.log('Logging in:', response);
        this.userService.getUserByEmail(this.user.email).subscribe(userData => {
          this.userStateService.setCurrentUser(userData);
          alert("Login Successful!");
          this.router.navigate(['/quiz']);
        });
      });
    }
  }

  onRegister() {
    if (this.register.name && this.register.lastName && this.register.email && this.register.password && this.register.role) {
      const user = this.register;
      console.log(user);
      this.userService.registerUser(user).subscribe(response => {
        console.log('Registering:', response);
        console.log(user);
        alert("Registration Successful!");
        this.toggleForms(); // Przełącz na login po rejestracji
      });
    }
  }
}
