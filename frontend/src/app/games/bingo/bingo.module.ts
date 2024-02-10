import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BingoComponent } from './bingo.component';
import { BingoRoutingModule } from './bingo-routing.module';

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  GridModule,
  ListGroupModule,
  TableModule,
} from '@coreui/angular';

@NgModule({
  declarations: [BingoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BingoRoutingModule,
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    GridModule,
    ListGroupModule,
    TableModule,
  ],
})
export class BingoModule {}
