import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackApi } from '../../services/back-api';
import { Router, RouterModule } from '@angular/router';
import { MainNavbar } from "../main-navbar/main-navbar";

@Component({
  selector: 'app-department-doctor',
  imports: [CommonModule, RouterModule, NgFor, MainNavbar],
  templateUrl: './department-doctor.html',
  styleUrl: './department-doctor.css',
})
export class DepartmentDoctor implements OnInit {
  departments: any[] = [];
  filteredDepartments: any[] = [];
  searchTerm: string = '';
  loading = true;

  constructor(private api: BackApi, private routes: Router) { }

  ngOnInit(): void {
    this.getall();
  }

  getall() {
    this.api.getalldepartment().subscribe({
      next: (res) => {
        this.departments = res.data || [];
        this.filteredDepartments = [...this.departments];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading departments:', err);
        this.loading = false;
      }
    });
  }

  viewDepartment(deptName: string) {
    if (deptName) {
      this.routes.navigate(['/department', deptName]);
    }
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredDepartments = this.departments.filter(dept => 
      (dept.department || '').toLowerCase().includes(this.searchTerm)
    );
  }

  getDepartmentIcon(name: string): string {
    const n = (name || '').toLowerCase();
    if (n.includes('cardio') || n.includes('heart')) return '❤️';
    if (n.includes('neuro') || n.includes('brain')) return '🧠';
    if (n.includes('ortho') || n.includes('bone')) return '🦴';
    if (n.includes('pediatr') || n.includes('child')) return '👶';
    if (n.includes('oncol') || n.includes('cancer')) return '🎗️';
    if (n.includes('derma') || n.includes('skin')) return '🩺';
    if (n.includes('ophthal') || n.includes('eye')) return '👁️';
    if (n.includes('dental') || n.includes('teeth')) return '🦷';
    if (n.includes('gynec') || n.includes('obstet')) return '🌸';
    if (n.includes('pulmon') || n.includes('lung') || n.includes('respir')) return '🫁';
    if (n.includes('gastro') || n.includes('digest')) return '🫃';
    if (n.includes('uro') || n.includes('kidney')) return '🔬';
    if (n.includes('endo') || n.includes('diabetes')) return '💉';
    if (n.includes('psych') || n.includes('mental')) return '🧘';
    if (n.includes('emergency') || n.includes('trauma')) return '🚑';
    return '🏥';
  }
}
