import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoinTossComponent } from './coin-toss.component';
import { CoinTossRoutingModule } from './coin-toss-routing.module';

@NgModule({
  declarations: [CoinTossComponent],
  imports: [CommonModule, ReactiveFormsModule, CoinTossRoutingModule],
})
export class CoinTossModule {}
