import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BackApi } from '../../services/back-api';
import { MainNavbar } from '../main-navbar/main-navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MainNavbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  name = '';
  email = '';
  password = '';
  role = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private backApi: BackApi, private router: Router) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.name = user.name || '';
          this.email = user.email || '';
          this.role = user.role || 'user';
        } catch (e) { }
      } else {
        // If not logged in, redirect to login
        this.router.navigate(['/login']);
      }
    }
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.name || !this.email) {
      this.errorMessage = 'Name and Email are required.';
      return;
    }

    this.isLoading = true;

    const updateData: any = {
      name: this.name,
      email: this.email
    };

    if (this.password) {
      updateData.password = this.password;
    }

    this.backApi.updateProfile(updateData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Profile updated successfully!';
        this.password = ''; // clear password input

        if (typeof window !== 'undefined') {
          // Update cached user in localStorage
          localStorage.setItem('user', JSON.stringify({
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role
          }));
          this.role = res.role || 'user';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to update profile. Please try again.';
      }
    });
  }
}
