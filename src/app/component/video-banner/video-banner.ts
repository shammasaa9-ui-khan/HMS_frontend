import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-banner.html',
  styleUrl: './video-banner.css'
})
export class VideoBanner implements OnInit {
  // Using a highly compatible direct hospital video link
  rawVideoUrl = 'https://cdn.pixabay.com/video/2023/10/24/186358-877964645_large.mp4';
  safeVideoUrl!: SafeResourceUrl;

  title = 'World-Class Healthcare Solutions';
  subtitle = 'Experience the future of medicine with state-of-the-art facilities and compassionate care.';
  ctaText = 'Book an Appointment';
  ctaLink = '/appointments';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawVideoUrl);
  }
}
