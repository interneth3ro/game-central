import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WidgetModule, GridModule } from '@coreui/angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    WidgetModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
