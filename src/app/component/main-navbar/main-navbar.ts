  import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Assuming CommonModule is needed if it's standalone, else it's fine
import { A11yService } from '../../services/a11y.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.html',
  styleUrls: ['./main-navbar.css'],
  standalone: true, // Need true if we are using CommonModule explicitly 
  imports: [CommonModule, RouterModule]
})
export class MainNavbar implements OnInit {
  isScrolled = false;
  menuOpen = false;
  dropdownOpen = false;

  isLoggedIn = false;
  userName = '';
  userRole = ''; // 'admin', 'doctor', 'user'

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.dropdownOpen = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  onLogoutClick() {
    this.closeDropdown();
    this.logout();
  }

  get userInitial(): string {
    return this.userName ? this.userName.charAt(0).toUpperCase() : 'U';
  }

  constructor(
    private router: Router,
    private a11y: A11yService
  ) { }

  increaseSize() {
    this.a11y.increase();
  }

  decreaseSize() {
    this.a11y.decrease();
  }

  resetSize() {
    this.a11y.reset();
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        this.isLoggedIn = true;
        try {
          const user = JSON.parse(userStr);
          this.userName = user.name || 'User';
          this.userRole = user.role || 'user';
        } catch (e) { }
      } else {
        this.isLoggedIn = false;
        this.userName = '';
        this.userRole = '';
      }
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = '';
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['login']);
  }

  goToBooking() {
    if (this.isLoggedIn) {
      this.router.navigate(['/details']);
    } else {
      localStorage.setItem('redirectAfterLogin', '/details');
      this.router.navigate(['/login']);
    }
  }

  about() {
    this.router.navigate(['about1'])
  }
  Home() {
    this.router.navigate([''])
  }
  Department() {
    this.router.navigate(['department'])
  }
}

