import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'resumen',
    component: OrderSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
