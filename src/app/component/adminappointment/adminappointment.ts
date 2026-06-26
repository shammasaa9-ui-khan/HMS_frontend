import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackApi } from '../../services/back-api';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-adminappointment',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebar],
  templateUrl: './adminappointment.html',
  styleUrls: ['./adminappointment.css']
})
export class Adminappointment implements OnInit {

  appointmentData = {
    patientName: '',
    doctorName: '',
    departmentName: '',
    date: '',
    phone: '',
    message: ''
  };

  appointments: any[] = [];
  filteredAppointments: any[] = [];

  searchText: string = '';
  selectedStatus: string = 'All';

  totalAppointments = 0;
  confirmedAppointments = 0;
  completedAppointments = 0;
  cancelledAppointments = 0;
  pendingAppointments = 0;

  constructor(
    private appointmentService: BackApi,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['doctorName']) {
        this.appointmentData.doctorName = params['doctorName'];
      }

      if (params['departmentName']) {
        this.appointmentData.departmentName = params['departmentName'];
      }
    });

    this.getAppointments();
  }

  bookAppointment() {
    if (
      !this.appointmentData.patientName ||
      !this.appointmentData.doctorName ||
      !this.appointmentData.departmentName ||
      !this.appointmentData.date ||
      !this.appointmentData.phone
    ) {
      alert('Please fill all required fields');
      return;
    }

    this.appointmentService.createAppointment(this.appointmentData).subscribe({
      next: (res: any) => {
        alert(res.message || 'Appointment booked successfully');

        this.appointmentData = {
          patientName: '',
          doctorName: '',
          departmentName: '',
          date: '',
          phone: '',
          message: ''
        };

        this.getAppointments();
      },
      error: (err: any) => {
        console.log(err);
        alert('Failed to book appointment');
      }
    });
  }

  getAppointments() {
    this.appointmentService.getAllAppointments().subscribe({
      next: (res: any) => {
        this.appointments = res.data || [];
        this.calculateStats();
        this.applyFilters();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  updateStatus(id: string, status: string) {
    this.appointmentService.updateAppointmentStatus(id, { status }).subscribe({
      next: () => {
        this.getAppointments();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  deleteAppointment(id: string) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          this.getAppointments();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  calculateStats() {
    this.totalAppointments = this.appointments.length;

    this.confirmedAppointments = this.appointments.filter(
      item => (item.status || 'Pending').toLowerCase() === 'confirmed'
    ).length;

    this.completedAppointments = this.appointments.filter(
      item => (item.status || 'Pending').toLowerCase() === 'completed'
    ).length;

    this.cancelledAppointments = this.appointments.filter(
      item => (item.status || 'Pending').toLowerCase() === 'cancelled'
    ).length;

    this.pendingAppointments = this.appointments.filter(
      item => (item.status || 'Pending').toLowerCase() === 'pending'
    ).length;
  }

  applyFilters() {
    const text = this.searchText.toLowerCase().trim();

    this.filteredAppointments = this.appointments.filter(item => {
      const status = (item.status || 'Pending').toLowerCase();

      const matchesSearch =
        (item.patientName || '').toLowerCase().includes(text) ||
        (item.doctorName || '').toLowerCase().includes(text) ||
        (item.departmentName || '').toLowerCase().includes(text) ||
        (item.phone || '').toLowerCase().includes(text) ||
        status.includes(text);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        status === this.selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }

  resetFilters() {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.applyFilters();
  }
}
