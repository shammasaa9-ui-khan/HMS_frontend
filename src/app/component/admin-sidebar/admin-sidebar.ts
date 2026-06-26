import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.css']
})
export class AdminSidebar {
  menuItems = [
    { name: 'Dashboard', icon: 'fa-solid fa-chart-pie', path: '/admin' },
    { name: 'Doctors', icon: 'fa-solid fa-user-doctor', path: '/adminpannel' },
    { name: 'Departments', icon: 'fa-solid fa-hospital', path: '/dp' },
    { name: 'Patients', icon: 'fa-solid fa-users', path: '/patients' },
    { name: 'Appointments', icon: 'fa-solid fa-calendar-check', path: '/appoint' },
    { name: 'Medical Records', icon: 'fa-solid fa-file-medical', path: '/records' },
    { name: 'Billing', icon: 'fa-solid fa-credit-card', path: '/billing' },
    { name: 'Pharmacy', icon: 'fa-solid fa-capsules', path: '/pharmacy' },
    { name: 'Emergency', icon: 'fa-solid fa-truck-medical', path: '/emergency' },
    { name: 'Analytics', icon: 'fa-solid fa-chart-line', path: '/analytics' }
  ];
}
