import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackApi } from '../../services/back-api';
import { MainNavbar } from '../main-navbar/main-navbar';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule, MainNavbar],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments implements OnInit {
  isLoggedIn = false;
  patientProfile: any = null;
  appointmentData = {
    patientName: '',
    doctorName: '',
    departmentName: '',
    date: '',
    phone: '',
    message: ''
  };
  appointmentList: any[] = [];
  constructor(private appointmentService: BackApi, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.checkLoginStatus();
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

  checkLoginStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        this.isLoggedIn = true;
        try {
          this.patientProfile = JSON.parse(userStr);
          this.appointmentData.patientName = this.patientProfile.name || '';
        } catch (e) {}
      } else {
        this.isLoggedIn = false;
      }
    }
  }

  bookAppointment() {
    this.appointmentService.createAppointment(this.appointmentData).subscribe({
      next: (res) => {
        alert(res.message);
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
      error: (err) => {
        console.log(err);
        alert('Failed to book appointment');
      }
    });
  }

  getAppointments() {
    this.appointmentService.getAllAppointments().subscribe({
      next: (res: any) => {
        const apps = res.data || [];
        if (this.patientProfile) {
          // Filter to show only this patient's appointments
          this.appointmentList = apps.filter((app: any) => 
            app.patientName?.toLowerCase() === this.patientProfile.name?.toLowerCase()
          );
        } else {
          this.appointmentList = [];
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateStatus(id: string, status: string) {
    this.appointmentService.updateAppointmentStatus(id, { status }).subscribe({
      next: () => {
        this.getAppointments();
      },
      error: (err) => {
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
        error: (err) => {
          console.log(err);
        }
      });
    }
  }



}
