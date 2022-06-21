import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LoaderService } from './core/services/loader.service';

import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';

//security
import { LoaderInterceptor } from './commons/interceptors/loader.interceptor';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './commons/loader/loader.component';
import { MessageComponent } from './commons/message/message.component';
import { DialogMessage } from './commons/dialog';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    LoaderComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    MaterialUiModule
  ],
  providers: [
    DialogMessage,
    LoaderService,
    { provide: Window, useValue: window },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
