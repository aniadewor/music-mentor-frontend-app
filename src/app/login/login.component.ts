import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginForm = true; 

  toggleForms() {
    this.isLoginForm = !this.isLoginForm; 
  }
}
