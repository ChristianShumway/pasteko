import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsPrimaryInterface } from '../../core/ports/primary/products.primary.interface';
import { PaquetePrimaryInterface } from '../../core/ports/primary/paquete.primary.interface';
import { ProductsSecondaryInterface } from '../../core/ports/secondary/products.secondary.interface';
import { PaqueteSecondaryInterface } from '../../core/ports/secondary/paquete.secondary.interface';
import { ProductsUsecase } from '../../core/usecases/products.usecase';
import { PaquetesUsecase } from '../../core/usecases/paquete.usecase';

import { ProductsService } from '../secondary/apirest/products.service';
import { PaqueteService } from '../secondary/apirest/paquete.service';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
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
    { provide: ProductsSecondaryInterface, useClass: ProductsService},
    { provide: PaquetePrimaryInterface, useClass: PaquetesUsecase},
    { provide: PaqueteSecondaryInterface, useClass: PaqueteService}
  ]
})
export class ProductsModule { }
