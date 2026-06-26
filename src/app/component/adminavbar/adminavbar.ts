import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminavbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './adminavbar.html',
  styleUrl: './adminavbar.css',
})
export class Adminavbar {
  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

}
