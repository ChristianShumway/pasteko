import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialUiModule
  ],
  exports: [
    HeaderComponent,
    MenuNavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
