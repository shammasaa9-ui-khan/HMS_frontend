import { Component, OnInit } from '@angular/core';
import { BackApi } from '../../services/back-api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-department',
  imports: [CommonModule, RouterModule, AdminSidebar],
  templateUrl: './admin-department.html',
  styleUrl: './admin-department.css',
})
export class AdminDepartment implements OnInit {
department: any;
    constructor(private api: BackApi, private routes: Router) { }
    departments: any[] = [];
    filteredDepartments: any[] = [];
  selectedDepartment: string = 'cardiology';
  ngOnInit(): void {
  this.getall();
  }
  getall() {
    this.api.getalldepartment().subscribe(res => {
      this.departments = res.data;
      this.filteredDepartments = res.data;
      console.log('Departments:', this.departments);
    });
}

filterDepartments(event: any) {
  const query = event.target.value.toLowerCase();
  this.filteredDepartments = this.departments.filter(dept => 
    dept.name.toLowerCase().includes(query) || 
    (dept.description && dept.description.toLowerCase().includes(query))
  );
}

  viewDepartment(department: any) {
    if (department.department ) {
      this.routes.navigate(['/department', department.department]);
    } else {
      console.error('Doctor department is missing');
    }
  }
  add(){
    this.routes.navigate(['addd'])
  }
  Update(id: string) {
  this.routes.navigate(['/edit-department', id]);
}

  Delete(id: string) {
    if (!id) return;

    if (confirm("Are you sure you want to delete this department?")) {
      this.api.deleteDepartment(id, {}).subscribe(() => {
        alert("Department deleted successfully");
        this.getall(); // Refresh the list after deletion
      });
    }
  }

}

