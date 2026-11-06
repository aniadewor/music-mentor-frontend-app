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
    schoolName: '',
    role: ''
  };

  registerError = '';

  constructor(private userService: UserServiceService, private router: Router, private userStateService: UserStateService) {}

  toggleForms() {
    this.isLoginForm = !this.isLoginForm;
    this.registerError = '';
  }

  clearRegisterError() {
    this.registerError = '';
  }

  onLogin() {
    if (this.login.email && this.login.password) {
      this.userService.loginUser(
      this.user.email,
      this.user.password
      ).subscribe(response => {
        console.log('Logging in:', response);
    //  this.userService.getUserByEmail(this.user.email).subscribe(userData => {
        this.user.email = this.login.email;
         this.userStateService.setCurrentUser(this.user);
          this.router.navigate(['/quiz']);
       });
      };
    }


  onRegister() {
    if (this.register.name && this.register.lastName && this.register.email && this.register.password && this.register.role &&this.register.schoolName) {
      const user = this.register;
      this.registerError = '';
      this.userService.registerUser(user).subscribe({
        next: (response) => {
          console.log('Registering:', response);
          alert('Registration Successful!');
          this.toggleForms();
        },
        error: (err) => {
          const message = typeof err.error === 'string' ? err.error : '';
          if (err.status === 409 || message.toLowerCase().includes('email already exists')) {
            this.registerError = 'Ten adres e-mail jest już zarejestrowany w bazie.';
          } else {
            this.registerError = 'Rejestracja nie powiodła się. Spróbuj ponownie.';
          }
        }
      });
    }
  }
}
