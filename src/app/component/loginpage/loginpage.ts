import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BackApi } from '../../services/back-api';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.css'
})
export class Loginpage {
  activeTab: 'admin' | 'doctor' | 'user' = 'user';
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private backApi: BackApi, private router: Router) {}

  setTab(tab: 'admin' | 'doctor' | 'user') {
    this.activeTab = tab;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;
    
    // We pass expectedRole to ensure the user logging in matches the selected tab
    const loginData = {
      email: this.email,
      password: this.password,
      expectedRole: this.activeTab 
    };

    this.backApi.login(loginData).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Store token and user details
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify({
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role
          }));

          // Redirect based on role and intended destination
          const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
          if (redirectAfterLogin) {
            localStorage.removeItem('redirectAfterLogin');
            this.router.navigateByUrl(redirectAfterLogin);
          } else {
             if (res.role === 'admin') {
               this.router.navigate(['/admin']);
             } else if (res.role === 'doctor') {
               this.router.navigate(['/doctor-dashboard']);
             } else {
               this.router.navigate(['/']); // or dashboard/details
             }
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);
        // Display proper error messages directly from backend
        this.errorMessage = err.error?.message || 'An unexpected error occurred during login. Please try again.';
      }
    });
  }
}
