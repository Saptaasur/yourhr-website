import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html'
})
export class ThankYouComponent {
  constructor(private router: Router) {}

  goToSignup() {
    this.router.navigate(['/']);
  }
}
