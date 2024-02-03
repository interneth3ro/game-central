import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  playGame(value: string): void {
    switch (value) {
      case 'coinToss':
        this.router.navigate(['/coin-toss']);
        break;
      case 'bingo':
        this.router.navigate(['/bingo']);
        break;
      default:
    }
  }
}
