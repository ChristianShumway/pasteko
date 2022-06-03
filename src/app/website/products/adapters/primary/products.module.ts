import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from '../secondary/apirest/products.service';
import { ProductsPrimaryInterface } from '../../core/ports/primary/products.primary.interface';
import { ProductsSecondaryInterface } from '../../core/ports/secondary/products.secondary.interface';
import { ProductsUsecase } from '../../core/usecases/products.usecase';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewPackagesComponent } from './view-packages/view-packages.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ViewProductsComponent,
    ViewPackagesComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ProductsPrimaryInterface, useClass: ProductsUsecase},
    { provide: ProductsSecondaryInterface, useClass: ProductsService}
  ]
})
export class ProductsModule { }
