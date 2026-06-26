import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BackApi } from '../../services/back-api';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-update-department',
  imports: [CommonModule,RouterModule,FormsModule, AdminSidebar],
  templateUrl: './update-department.html',
  styleUrl: './update-department.css',
})
export class UpdateDepartment  implements OnInit{

  id!: string;

  departmentData = {
    name: '',
    description: '',
    image: ''
  };

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: BackApi
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.departmentService.getDepartmentById(this.id)
      .subscribe({
        next: (res: any) => {
          const data = res.data || res;
          this.departmentData = {
            name: data.name || '',
            description: data.description || '',
            image: data.image || ''
          };
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading department:', err);
          this.loading = false;
        }
      });
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.id, this.departmentData)
      .subscribe(() => {
        alert('Department Updated Successfully');
        this.router.navigate(['/dp']);
      });
  }
}
