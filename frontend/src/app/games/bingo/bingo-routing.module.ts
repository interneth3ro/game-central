import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BingoComponent } from './bingo.component';

const routes: Routes = [
  {
    path: '',
    component: BingoComponent,
    data: {
      title: 'Bingo!',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BingoRoutingModule {}
