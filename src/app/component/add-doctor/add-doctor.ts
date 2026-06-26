import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackApi } from '../../services/back-api';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminSidebar],
  templateUrl: './add-doctor.html',
  styleUrls: ['./add-doctor.css'],
})
export class AddDoctor {
    doctor = {
      name: '',
      email: '',
      department: '',
      experience: null as any,
      qualification: '',
      password: '',
      image: ''
    };


  constructor(private API: BackApi, private router: Router) {}

  onSubmit(){
    console.log(this.doctor);

    this.API.AddDoctor(this.doctor).subscribe({
      next: (res) => {
        alert('Doctor added successfully');
        this.doctor = {
          name: '',
          email: '',
          department: '',
          experience: null as any,
          qualification: '',
          password: '',
          image: ''
        };
        this.router.navigate(['adminpannel']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add doctor');
      }

    })

  }

}

