import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MainNavbar } from '../main-navbar/main-navbar';
import { BackApi } from '../../services/back-api';

@Component({
  selector: 'app-docter-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MainNavbar, NgFor],
  templateUrl: './docter-details.html',
  styleUrls: ['./docter-details.css'],
})
export class DocterDetails implements OnInit {
  @ViewChild('doctorContainer') doctorContainer!: ElementRef;

  doctors: any[] = [];

  // fallback image
  defaultDoctorImage =
    '';

  constructor(
    private api: BackApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getall();
  }

  scrollLeft() {
    this.doctorContainer.nativeElement.scrollBy({
      left: -1000,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.doctorContainer.nativeElement.scrollBy({
      left: 1000,
      behavior: 'smooth'
    });
  }

  getall() {
    this.api.getAllDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res.data.map((doctor: any) => {
          return {
            ...doctor,
            image: this.getFullImageUrl(doctor.image)
          };
        });

        console.log('Doctors:', this.doctors);
      },
      error: (err) => {
        console.error('Error loading doctors', err);
      }
    });
  }

  getFullImageUrl(imagePath: string): string {
    if (!imagePath) {
      return this.defaultDoctorImage;
    }

    // already full url
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    // backend relative path aanenkil
    return `http://localhost:3000/${imagePath}`;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultDoctorImage;
  }

  viewDoctor(id: any) {
    console.log('Doctor ID:', id);
    this.router.navigate(['/doctor', id]);
  }
}
