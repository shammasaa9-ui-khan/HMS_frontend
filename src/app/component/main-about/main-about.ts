import { Component } from '@angular/core';
import { MainNavbar } from "../main-navbar/main-navbar";
import { VideoBanner } from "../video-banner/video-banner";
import { Footer } from "../footer/footer";
import { DepartmentDoctor } from "../department-doctor/department-doctor";

@Component({
  selector: 'app-main-about',
  imports: [MainNavbar, VideoBanner, Footer, DepartmentDoctor],
  templateUrl: './main-about.html',
  styleUrl: './main-about.css',
})
export class MainAbout {

}
