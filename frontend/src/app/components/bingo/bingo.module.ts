import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BingoComponent } from './bingo.component';
import { BingoRoutingModule } from './bingo-routing.module';

@NgModule({
  declarations: [BingoComponent],
  imports: [CommonModule, ReactiveFormsModule, BingoRoutingModule],
})
export class BingoModule {}
