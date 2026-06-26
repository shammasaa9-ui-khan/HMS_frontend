import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BackApi } from '../../services/back-api';
import { MainNavbar } from '../main-navbar/main-navbar';

@Component({
  selector: 'app-user-dashbord',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MainNavbar],
  templateUrl: './user-dashbord.html',
  styleUrl: './user-dashbord.css',
})
export class UserDashbord implements OnInit {
  isLoggedIn = false;
  userName = '';
  userRole = '';
  appointmentList: any[] = [];
  upcomingList: any[] = [];
  isLoading = true;

  // Tabs: 'overview', 'book', 'appointments', 'doctors'
  activeTab = 'overview';

  // Rescheduling state
  reschedulingAppId = '';
  newScheduleDate = '';

  // Stats
  totalAppointments = 0;
  upcomingAppointments = 0;
  completedAppointments = 0;
  prescriptionsReceived = 0;

  // Booking Form Data
  bookingData = {
    patientName: '',
    doctorName: '',
    departmentName: '',
    date: '',
    phone: '',
    message: ''
  };

  // Doctors & Search State
  doctorsList: any[] = [];
  filteredDoctors: any[] = [];
  departmentsList: any[] = [];
  searchQuery = '';
  selectedSpecialty = '';

  // Fallback Doctor Image
  defaultDoctorImage = 'https://cdn-icons-png.flaticon.com/512/387/387561.png';

  constructor(
    private apiService: BackApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.getAppointments();
      this.loadDoctors();
      this.loadDepartments();
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkLoginStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        this.isLoggedIn = true;
        try {
          const user = JSON.parse(userStr);
          this.userName = user.name || 'User';
          this.userRole = user.role || 'user';
          this.bookingData.patientName = this.userName;
        } catch (e) {
          this.isLoggedIn = false;
        }
      } else {
        this.isLoggedIn = false;
      }
    }
  }

  getAppointments() {
    this.isLoading = true;
    this.apiService.getAllAppointments().subscribe({
      next: (res: any) => {
        const apps = res.data || [];
        // Filter appointments for the logged-in user
        this.appointmentList = apps.filter((app: any) =>
          app.patientName?.toLowerCase() === this.userName?.toLowerCase()
        );

        // Calculate statistics & lists
        this.calculateStats();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch appointments:', err);
        this.isLoading = false;
      }
    });
  }

  calculateStats() {
    this.totalAppointments = this.appointmentList.length;
    
    this.upcomingList = this.appointmentList.filter((app: any) => {
      const status = app.status || 'Pending';
      return status === 'Pending' || status === 'Confirmed';
    });

    this.upcomingAppointments = this.upcomingList.length;

    this.completedAppointments = this.appointmentList.filter((app: any) => 
      app.status === 'Completed'
    ).length;

    this.prescriptionsReceived = this.appointmentList.filter((app: any) => 
      app.prescription && app.prescription.trim() !== ''
    ).length;
  }

  // Load Doctors from API
  loadDoctors() {
    this.apiService.getAllDoctors().subscribe({
      next: (res: any) => {
        const docs = res.data || [];
        this.doctorsList = docs.map((doc: any) => ({
          ...doc,
          image: this.getFullImageUrl(doc.image)
        }));
        this.filteredDoctors = [...this.doctorsList];
      },
      error: (err) => {
        console.error('Failed to load doctors:', err);
      }
    });
  }

  // Load Departments from API
  loadDepartments() {
    this.apiService.getalldepartment().subscribe({
      next: (res: any) => {
        this.departmentsList = res || [];
      },
      error: (err) => {
        console.error('Failed to load departments:', err);
      }
    });
  }

  // Filter Doctors by Search Input and Department Dropdown
  filterDoctors() {
    this.filteredDoctors = this.doctorsList.filter((doc: any) => {
      const matchesSearch = doc.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        doc.specialization?.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesSpecialty = !this.selectedSpecialty || 
        doc.department?.toLowerCase() === this.selectedSpecialty.toLowerCase();

      return matchesSearch && matchesSpecialty;
    });
  }

  getFullImageUrl(imagePath: string): string {
    if (!imagePath) {
      return this.defaultDoctorImage;
    }
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    return `http://localhost:4065/${imagePath}`;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultDoctorImage;
  }

  selectDoctorForBooking(doctor: any) {
    this.bookingData.doctorName = doctor.name;
    this.bookingData.departmentName = doctor.department || '';
    this.switchTab('book');
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.cancelReschedule();
  }

  // BOOK APPOINTMENT
  bookAppointment() {
    if (!this.bookingData.patientName || !this.bookingData.doctorName || !this.bookingData.departmentName || !this.bookingData.date || !this.bookingData.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    this.apiService.createAppointment(this.bookingData).subscribe({
      next: (res) => {
        alert(res.message || 'Appointment booked successfully.');
        this.bookingData = {
          patientName: this.userName,
          doctorName: '',
          departmentName: '',
          date: '',
          phone: '',
          message: ''
        };
        this.getAppointments();
        this.switchTab('appointments');
      },
      error: (err) => {
        console.error('Failed to book appointment:', err);
        alert('Failed to book appointment. Please try again.');
      }
    });
  }

  // CANCEL APPOINTMENT
  cancelAppointment(id: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.apiService.updateAppointmentStatus(id, { status: 'Cancelled' }).subscribe({
        next: () => {
          alert('Appointment cancelled successfully.');
          this.getAppointments();
        },
        error: (err) => {
          console.error('Failed to cancel appointment:', err);
          alert('Failed to cancel appointment. Please try again.');
        }
      });
    }
  }

  // RESCHEDULE APPOINTMENT
  startReschedule(app: any) {
    this.reschedulingAppId = app._id;
    if (app.date) {
      const d = new Date(app.date);
      const tzOffset = d.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
      this.newScheduleDate = localISOTime;
    } else {
      this.newScheduleDate = '';
    }
  }

  cancelReschedule() {
    this.reschedulingAppId = '';
    this.newScheduleDate = '';
  }

  saveReschedule(id: string) {
    if (!this.newScheduleDate) {
      alert('Please select a valid date and time.');
      return;
    }

    this.apiService.updateAppointmentStatus(id, { date: this.newScheduleDate }).subscribe({
      next: () => {
        alert('Appointment rescheduled successfully.');
        this.cancelReschedule();
        this.getAppointments();
      },
      error: (err) => {
        console.error('Failed to reschedule appointment:', err);
        alert('Failed to reschedule appointment. Please try again.');
      }
    });
  }
}
