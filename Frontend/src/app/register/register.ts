import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth'; // Importing from auth.ts
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html', // Pointing to register.html
  styleUrl: './register.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerObj = {
    name: '',
    email: '',
    password: '',
  };

  onRegister() {
    this.authService.register(this.registerObj).subscribe({
      next: (res: any) => {
        alert('Registration Success!');
        this.router.navigate(['login']); // Send them to login page
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      },
    });
  }
}