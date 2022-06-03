import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuNavComponent,
    FooterComponent,
    CounterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialUiModule
  ],
  exports: [
    HeaderComponent,
    MenuNavComponent,
    FooterComponent,
    CounterComponent
  ]
})
export class SharedModule { }
