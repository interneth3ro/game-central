import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AlertModule,
  ButtonModule,
  ButtonGroupModule,
  CalloutModule,
  CardModule,
  FormModule,
  GridModule,
  ListGroupModule,
} from '@coreui/angular';

import { CoinTossComponent } from './coin-toss.component';
import { CoinTossRoutingModule } from './coin-toss-routing.module';

@NgModule({
  declarations: [CoinTossComponent],
  imports: [
    AlertModule,
    ButtonModule,
    ButtonGroupModule,
    CalloutModule,
    CardModule,
    CommonModule,
    FormModule,
    GridModule,
    ListGroupModule,
    ReactiveFormsModule,
    CoinTossRoutingModule,
  ],
})
export class CoinTossModule {}
