import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BackApi } from '../../services/back-api';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-add-department',
  imports: [CommonModule, RouterModule, FormsModule, AdminSidebar],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})
export class AddDepartment {
  departmentData: any = {
    name: "",
    description: "",
    image: ""
  };

  loading: boolean = false;

  constructor(
    private departmentService: BackApi,
    private router: Router
  ) {}

  addDepartment() {
    this.loading = true;
    this.departmentService
      .addDepartment(this.departmentData)
      .subscribe({
        next: (res) => {
          alert("Department Initialized Successfully ✅");
          this.loading = false;
          this.router.navigate(['/dp']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
