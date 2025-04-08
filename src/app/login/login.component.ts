import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginForm = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  user: User= new User()

  Role = Role

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      role: ['', Validators.required]
    });
  }

  toggleForms() {
    this.isLoginForm = !this.isLoginForm;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userService.loginUser(
      this.user.email,
      this.user.password
      ).subscribe(response => {
        console.log('Logging in:', response);
        alert("Login Successful!");
        this.router.navigate(['/quiz']);
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
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
