import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoinTossComponent } from './coin-toss.component';

const routes: Routes = [
  {
    path: '',
    component: CoinTossComponent,
    data: {
      title: 'Coin Toss!',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinTossRoutingModule {}
