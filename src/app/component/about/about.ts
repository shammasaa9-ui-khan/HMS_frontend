import { Component } from '@angular/core';
import { MainNavbar } from "../main-navbar/main-navbar";
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule, Footer, MainNavbar],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  constructor (private routes:Router){}
 imagePath = 'https://wallpaperaccess.com/full/10593818.jpg';

 images = [
    {
      src: 'https://as2.ftcdn.net/v2/jpg/01/03/72/93/1000_F_103729376_QE8y6FP10JyGc4kk8e2yIqrFRa921IqI.jpg',
      alt: 'Doctor with child'
    },
    {
      src: 'https://ihpl.llu.edu/sites/ihpl.llu.edu/files/field/image/senior-care.jpg',
      alt: 'Pregnant woman'
    },
    {
      src: 'https://www.waldenu.edu/media/5390/seo-2158-bs-african-american-pediatrician-353293868-1200x675',
      alt: 'Doctor consultation'
    }
  ];

 read(){
  this.routes.navigate(['department'])



 }


}
