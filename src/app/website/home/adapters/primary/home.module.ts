import { MenuOptionsUsecase } from './../../core/usecases/menu-options.usecase';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuOptionsPrimaryInterface } from '../../core/ports/primary/menu-options.primary.interface';
import { MenuOptionsSecondaryInterface } from '../../core/ports/secondary/menu-options.secondary.interface';
import { MenuOptionsService } from '../secondary/apirest/menu-options.service';
import { OptionMenuComponent } from './option-menu/option-menu.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    OptionMenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialUiModule
  ],
  providers: [
    { provide: MenuOptionsPrimaryInterface, useClass: MenuOptionsUsecase},
    { provide: MenuOptionsSecondaryInterface, useClass: MenuOptionsService}
  ]
})
export class HomeModule { }
