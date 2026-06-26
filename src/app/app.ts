import { Component, OnInit, Renderer2 } from '@angular/core';
import { A11yService } from './services/a11y.service';

import { DocterDetails } from "./component/docter-details/docter-details";
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private a11y: A11yService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.a11y.currentScale$.subscribe(scale => {
      // Apply the scale to the root HTML element safely
      if (typeof document !== 'undefined') {
        this.renderer.setStyle(document.documentElement, 'font-size', `${scale * 16}px`);
      }
    });
  }
}
