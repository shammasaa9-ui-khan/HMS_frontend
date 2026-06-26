import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BackApi } from '../../services/back-api';
import { MainNavbar } from '../main-navbar/main-navbar';
import { DoctorSidebar } from '../doctor-sidebar/doctor-sidebar';

@Component({
  selector: 'app-doctor-dashbord',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DoctorSidebar],
  templateUrl: './doctor-dashbord.html',
  styleUrls: ['./doctor-dashbord.css'],
})
export class DoctorDashbord implements OnInit {

  // Doctor profile loaded from localStorage (set during login)
  doctorProfile: any = {
    name: 'Dr. Unknown',
    specialization: 'General',
    department: 'General',
    experience: 0,
    phone: 'N/A',
    email: 'N/A',
    status: 'Available',
  };

  // Stats
  totalPatients: number = 0;
  todayAppointments: number = 0;
  completedAppointments: number = 0;
  pendingAppointments: number = 0;

  // Table
  recentAppointments: any[] = [];

  loading: boolean = false;
  errorMessage: string = '';

  today: string = '';

  selectedAppointment: any = null; // For viewing patient details / prescription modal
  prescriptionText: string = '';

  constructor(
    private service: BackApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set today's date string for comparison (YYYY-MM-DD)
    const now = new Date();
    this.today = now.toISOString().split('T')[0];

    // Load doctor profile from localStorage
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.doctorProfile = { ...this.doctorProfile, ...parsed };
      } catch (_) {}
    }

    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getAllAppointments().subscribe({
      next: (res: any) => {
        const appointments: any[] = res?.data || [];

        // Filter appointments for this doctor
        const doctorApps = appointments.filter(
          (a: any) =>
            a.doctorName?.toLowerCase() ===
            this.doctorProfile.name?.toLowerCase()
        );

        // Stats
        const uniquePatients = new Set(
          doctorApps.map((a: any) => a.patientName?.toLowerCase())
        );
        this.totalPatients = uniquePatients.size;

        this.todayAppointments = doctorApps.filter((a: any) => {
          const appDate = a.date ? new Date(a.date).toISOString().split('T')[0] : '';
          return appDate === this.today;
        }).length;

        this.completedAppointments = doctorApps.filter(
          (a: any) => a.status?.toLowerCase() === 'completed'
        ).length;

        this.pendingAppointments = doctorApps.filter(
          (a: any) =>
            !a.status || a.status?.toLowerCase() === 'pending'
        ).length;

        // Recent: last 10
        this.recentAppointments = doctorApps.slice(0, 10);

        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading appointments:', err);
        this.errorMessage = 'Failed to load appointment data.';
        this.loading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    if (!status) return 'badge-pending';
    switch (status.toLowerCase()) {
      case 'completed': return 'badge-completed';
      case 'cancelled': return 'badge-cancelled';
      case 'confirmed': return 'badge-confirmed';
      default: return 'badge-pending';
    }
  }

  selectAppointment(app: any): void {
    this.selectedAppointment = app;
    this.prescriptionText = app.prescription || '';
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.prescriptionText = '';
  }

  updateStatus(app: any, status: string): void {
    this.service.updateAppointmentStatus(app._id, { status }).subscribe({
      next: (res: any) => {
        app.status = status;
        if (this.selectedAppointment && this.selectedAppointment._id === app._id) {
          this.selectedAppointment.status = status;
        }
        alert(`Status updated to ${status}`);
        this.loadAppointments();
      },
      error: (err: any) => {
        console.error('Failed to update status', err);
        alert('Failed to update appointment status.');
      }
    });
  }

  savePrescription(): void {
    if (!this.selectedAppointment) return;
    this.service.updateAppointmentStatus(this.selectedAppointment._id, { prescription: this.prescriptionText }).subscribe({
      next: (res: any) => {
        this.selectedAppointment.prescription = this.prescriptionText;
        const found = this.recentAppointments.find(a => a._id === this.selectedAppointment._id);
        if (found) {
          found.prescription = this.prescriptionText;
        }
        alert('Prescription saved successfully');
        this.closeModal();
        this.loadAppointments();
      },
      error: (err: any) => {
        console.error('Failed to save prescription', err);
        alert('Failed to save prescription.');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
