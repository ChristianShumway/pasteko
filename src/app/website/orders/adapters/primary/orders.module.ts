import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';

import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialUiModule
  ]
})
export class OrdersModule { }
