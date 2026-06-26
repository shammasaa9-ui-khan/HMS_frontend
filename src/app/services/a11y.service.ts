import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class A11yService {
  private scaleSource = new BehaviorSubject<number>(1.0);
  currentScale$ = this.scaleSource.asObservable();

  constructor() {}

  increase() {
    const next = this.scaleSource.value + 0.1;
    if (next <= 1.5) {
      this.scaleSource.next(next);
    }
  }

  decrease() {
    const next = this.scaleSource.value - 0.1;
    if (next >= 0.8) {
      this.scaleSource.next(next);
    }
  }

  reset() {
    this.scaleSource.next(1.0);
  }

  getCurrentScale(): number {
    return this.scaleSource.value;
  }
}
