import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { BackApi } from '../../services/back-api';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registerpage.html',
  styleUrl: './registerpage.css'
})
export class Registerpage implements OnInit {
  activeTab: 'user' | 'doctor' | 'admin' = 'user';
  name = '';
  email = '';
  password = '';
  
  // Admin-specific
  adminSecret = '';

  // Doctor-specific
  department = '';
  experience: number | null = null;
  qualification = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private backApi: BackApi, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const roleParam = params['role'];
      if (roleParam === 'admin') {
        this.activeTab = 'admin';
      } else if (roleParam === 'doctor') {
        this.activeTab = 'doctor';
      } else {
        this.activeTab = 'user';
      }
    });
  }

  setTab(tab: 'user' | 'doctor' | 'admin') {
    this.activeTab = tab;
    this.errorMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    if (this.activeTab === 'admin' && !this.adminSecret) {
      this.errorMessage = 'Please enter the Admin Verification Code.';
      return;
    }

    if (this.activeTab === 'doctor') {
      if (!this.department || this.experience === null || !this.qualification) {
        this.errorMessage = 'Please fill out all professional details.';
        return;
      }
    }

    this.isLoading = true;

    const registerData: any = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.activeTab
    };

    if (this.activeTab === 'admin') {
      registerData.adminSecret = this.adminSecret;
    } else if (this.activeTab === 'doctor') {
      registerData.department = this.department;
      registerData.experience = this.experience;
      registerData.qualification = this.qualification;
    }

    this.backApi.register(registerData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify({
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role
          }));
          
          if (res.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (res.role === 'doctor') {
            this.router.navigate(['/doctor-dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration error:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
