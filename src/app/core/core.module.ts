import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSharedService } from './services/products.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProductSharedService
  ]
})
export class CoreModule { }
