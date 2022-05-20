import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./website/home/adapters/primary/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'productos',
        loadChildren: () => import('./website/products/adapters/primary/products.module').then(m => m.ProductsModule)
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
