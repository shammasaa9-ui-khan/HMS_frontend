import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booksuccsses',
  imports: [],
  templateUrl: './booksuccsses.html',
  styleUrl: './booksuccsses.css',
})
export class Booksuccsses {
  constructor( private routes:Router){}


  bookAnother(){
    this.routes.navigate(['details'])
  };
  goHome(){
    this.routes.navigate(['/'])

  };
}
