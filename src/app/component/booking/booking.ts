// import { Router } from 'express';
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  // constructor(private routes:Router){}


  bookingForm: FormGroup;

  department= ['Dermatology', 'Pediatrics', ' Cardiology'];

  constructor(private fb: FormBuilder ,private routes:Router) {
    this.bookingForm = this.fb.group({
      patientName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', Validators.email],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      message: ['']
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
      alert('Appointment Booked Successfully!');
      this.bookingForm.reset();
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
  just(){
    this.routes.navigate(['hiii'])

  }
}
