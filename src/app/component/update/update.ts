import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackApi } from '../../services/back-api';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebar],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update implements OnInit {

  doctorId!: string;

  doctor = {
    name: '',
    specialization: '',
    department: '',
    experience: 0,
    phone: '',
    email: '',
    status: 'Available',
    image: ''
  };
  constructor(
    private api: BackApi,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
  this.doctorId = this.route.snapshot.paramMap.get('id') || '';

  if (this.doctorId) {
    this.api.allDoctorsingle_view(this.doctorId).subscribe({
      next: (res: any) => {
        console.log(res);   // 👈 check this once
        this.doctor = res.data;  // ✅ IMPORTANT FIX
      },
      error: (err) => console.error(err)
    });
  }
}

updateDoctor() {
  this.api.update_doctor(this.doctorId, this.doctor)
    .subscribe({
      next: () => {
        alert("Doctor Updated Successfully");
        this.router.navigate(['admin']);
      },
      error: (err) => {
        console.error(err);
      }
    });


}
}










