import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-sidebar.html',
  styleUrls: ['./doctor-sidebar.css']
})
export class DoctorSidebar implements OnInit {
  doctorName = 'Doctor';
  doctorAvatar = '';

  menuItems = [
    { name: 'Dashboard', icon: 'fa-solid fa-chart-pie', path: '/doctor-dashboard' },
    { name: 'Assigned Appointments', icon: 'fa-solid fa-calendar-check', path: '/doctor-dashboard' },
    { name: 'Patient Records', icon: 'fa-solid fa-file-medical', path: '/doctor-dashboard' },
    { name: 'Settings', icon: 'fa-solid fa-gear', path: '/doctor-dashboard' }
  ];

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.doctorName = user.name || 'Doctor';
          this.doctorAvatar = user.image || '';
        } catch (e) {}
      }
    }
  }

  get initial(): string {
    return this.doctorName ? this.doctorName.charAt(0).toUpperCase() : 'D';
  }
}
