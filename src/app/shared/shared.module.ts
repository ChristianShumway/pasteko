import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './counter/counter.component';
import { ProductsPrimaryInterface } from '../website/products/core/ports/primary/products.primary.interface';
import { ProductsUsecase } from '../website/products/core/usecases/products.usecase';
import { ProductsSecondaryInterface } from '../website/products/core/ports/secondary/products.secondary.interface';
import { ProductsService } from '../website/products/adapters/secondary/apirest/products.service';
import { SalePrimaryInterface } from '../website/orders/core/ports/primary/sale.primary.interface';
import { SalesUsecase } from '../website/orders/core/usecases/sale.usecase';
import { SaleSecondaryInterface } from '../website/orders/core/ports/secondary/sale.secondary.interface';
import { SaleService } from '../website/orders/adapters/secondary/apirest/sale.service';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { TimerComponent } from './components/timer/timer.component';
import { InfoProductComponent } from './components/info-product/info-product.component';
import { AvatarHelpComponent } from './components/avatar-help/avatar-help.component';
import { ModalPaqueteComponent } from './components/modal-paquete/modal-paquete.component';
import { ProductPackComponent } from './components/product-pack/product-pack.component';
@NgModule({
  declarations: [
    HeaderComponent,
    MenuNavComponent,
    FooterComponent,
    CounterComponent,
    MessageDialogComponent,
    TimerComponent,
    InfoProductComponent,
    AvatarHelpComponent,
    ModalPaqueteComponent,
    ProductPackComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialUiModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    MenuNavComponent,
    FooterComponent,
    CounterComponent,
    MessageDialogComponent,
    TimerComponent,
    InfoProductComponent,
    AvatarHelpComponent
  ],
  providers: [
    { provide: ProductsPrimaryInterface, useClass: ProductsUsecase},
    { provide: ProductsSecondaryInterface, useClass: ProductsService},
    { provide: SalePrimaryInterface, useClass: SalesUsecase},
    { provide: SaleSecondaryInterface, useClass: SaleService},
  ]
})
export class SharedModule { }
