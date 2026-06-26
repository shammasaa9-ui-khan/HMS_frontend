import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackApi } from '../../services/back-api';
import { Router, RouterModule } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-adminpannel',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSidebar],
  templateUrl: './adminpannel.html',
  styleUrls: ['./adminpannel.css']   // ✅ FIXED
})
export class Adminpannel implements OnInit {

  doctors: any[] = [];

  constructor(
    private api: BackApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getall();
  }

  /* ================= GET ALL ================= */
  getall() {
    this.api.getAllDoctors().subscribe({
      next: (res:any) => {
        this.doctors = res?.data || [];   // ✅ SAFE FIX
      },
      error: (err) => {
        console.error(err);
        this.doctors = [];
      }
    });
  }

  /* ================= DELETE ================= */
  detete(id:string){
    if(!id) return;

    if(confirm("Are you sure you want to delete this doctor?")){
      this.api.deletedoctor(id, {}).subscribe(()=>{
        alert("Doctor deleted successfully");
        this.getall();
      });
    }
  }

  /* ================= VIEW ================= */
  // openSingleDoctor(id:string){
  //   if(id){
  //     this.router.navigate(['/doctor', id]);
  //   }
  // }

  /* ================= EDIT ================= */
  Edit(id:string){
    if(id){
      this.router.navigate(['/update', id]);
    }
  }

  /* ================= ADD ================= */
  addDoctor(){
    this.router.navigate(['/add']);
  }

}
