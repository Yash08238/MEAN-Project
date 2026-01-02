import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth'; // Importing from your auth.ts
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html', // Pointing to your login.html
  styleUrl: './login.css',
})
export class LoginComponent {
  // We can keep the class name standard

  authService = inject(AuthService);
  router = inject(Router);

  loginObj = {
    email: '',
    password: '',
  };

  onLogin() {
    this.authService.login(this.loginObj).subscribe({
      next: (res: any) => {
        alert('Login Success!');
        // Save the token for security
        localStorage.setItem('token', res.token);
        // Send them to a "home" page (or just stay here for now)
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      },
    });
  }
}