

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Footer } from '../footer/footer';
import { MainNavbar } from '../main-navbar/main-navbar';
import { BackApi } from '../../services/back-api';

@Component({
  selector: 'app-docter-single-view',
  standalone: true,
  imports: [CommonModule, RouterModule, MainNavbar],
  templateUrl: './docter-single-view.html',
  styleUrls: ['./docter-single-view.css'],
})
export class DocterSingleView implements OnInit {

  doctor: any = null;
  id!: string | null;
  canBook: boolean = true;
  departmentDescription: any = null;

  constructor(
    private api: BackApi,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParams.subscribe(params => {
      this.canBook = params['canBook'] !== 'false';
    });

    if (this.id) {
      this.api.allDoctorsingle_view(this.id).subscribe(res => {
        this.doctor = res.data;
        if (!this.canBook && this.doctor?.department) {
          this.loadDepartmentDescription(this.doctor.department);
        }
      });
    }
  }

  loadDepartmentDescription(deptName: string) {
    this.api.getDepartmentDescriptionByDepartmentName(deptName).subscribe({
      next: (found: any) => {
        this.departmentDescription = found;
      },
      error: (err) => {
        console.error('Error loading department description:', err);
      }
    });
  }


  goHome() {
    this.router.navigate(['/']);

  }


  goBooking() {
    this.router.navigate(['/book'], {
      queryParams: {
        doctorName: this.doctor?.name,
        departmentName: this.doctor?.department
      }
    });
  }
}
