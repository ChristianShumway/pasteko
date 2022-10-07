import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';

import { OrderComponent } from './order/order.component';
import { SalePrimaryInterface } from '../../core/ports/primary/sale.primary.interface';
import { SaleSecondaryInterface } from '../../core/ports/secondary/sale.secondary.interface';
import { SalesUsecase } from '../../core/usecases/sale.usecase';
import { SaleService } from '../secondary/apirest/sale.service';
import { ProductOrderComponent } from './product-order/product-order.component';
import { ProductRecommendationComponent } from './product-recommendation/product-recommendation.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [
    OrderComponent,
    ProductOrderComponent,
    ProductRecommendationComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialUiModule
  ],
  providers: [
    { provide: SalePrimaryInterface, useClass: SalesUsecase},
    { provide: SaleSecondaryInterface, useClass: SaleService},
  ],
  exports: [
    OrderComponent
  ]
})
export class OrdersModule { }
