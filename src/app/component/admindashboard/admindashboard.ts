import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BackApi } from '../../services/back-api';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSidebar],
  templateUrl: './admindashboard.html',
  styleUrls: ['./admindashboard.css'],
})
export class Admindashboard implements OnInit {

  totalDoctors: number = 0;
  totalPatients: number = 0;
  totalDepartment: number = 0;
  totalAppointments: number = 0;
  recentAppointments: any[] = [];
  filteredConsultations: any[] = [];
  departments: any[] = [];
  today: Date = new Date();

  loading: boolean = false;
  showNotifications: boolean = false;
  errorMessage: string = '';

  constructor(
    private service: BackApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadDepartments();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getDashboardData().subscribe({
      next: (data: any) => {
        console.log('Dashboard Data:', data);

        this.totalDoctors = data?.totalDoctors || 0;
        this.totalPatients = data?.totalPatients || 0;
        this.totalDepartment = data?.totalDepartments || 0;
        this.totalAppointments = data?.totalAppointments || 0;
        this.recentAppointments = data?.recentAppointments || [];
        this.filteredConsultations = [...this.recentAppointments];

        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.errorMessage = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredConsultations = this.recentAppointments.filter(app => 
      app.patientName?.toLowerCase().includes(query) || 
      app.doctorName?.toLowerCase().includes(query) ||
      app.departmentName?.toLowerCase().includes(query)
    );
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  loadDepartments(): void {
    this.service.getalldepartment().subscribe({
      next: (res: any) => {
        this.departments = res.data || [];
        console.log('Departments loaded:', this.departments);
      },
      error: (err) => console.error('Error fetching departments:', err)
    });
  }

  DeleteDepartment(id: string): void {
    if (confirm('Are you sure you want to decommission this department?')) {
      this.service.deleteDepartment(id, {}).subscribe({
        next: () => {
          this.loadDepartments();
          this.loadDashboard(); // Refresh stats
        },
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  UpdateDepartment(id: string): void {
    this.router.navigate(['/edit-department', id]);
  }

  DeleteAppointment(id: string): void {
    if (confirm('Are you sure you want to remove this appointment record?')) {
      this.service.deleteAppointment(id).subscribe({
        next: () => this.loadDashboard(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  UpdateAppointment(id: string): void {
    this.router.navigate(['/details/appointment']); // Redirect to full panel for detailed editing
  }

  addDoctor(): void {
    this.router.navigate(['/adminpannel']);
  }

  addPatient(): void {
    this.router.navigate(['/det']);
  }

  addDepartment(): void {
    this.router.navigate(['/addd']);
  }

  goAppointments(): void {
    this.router.navigate(['/details/appointment']);
  }

  goReport(): void {
    this.router.navigate(['/details/report']);
  }

  goSettings(): void {
    this.router.navigate(['/details/settings']);
  }
}
