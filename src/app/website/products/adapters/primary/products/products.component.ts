import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ProductsPrimaryInterface } from '../../../core/ports/primary/products.primary.interface';
import { ProductModel } from './../../../core/domain/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title: string = 'Menú';
  idCategoria: string | null = null ;
  productsList: ProductModel[] = [];

  constructor(
    private usecase: ProductsPrimaryInterface,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.route.paramMap.pipe(
      switchMap( ((params: ParamMap) => {
        this.idCategoria = params.get('idCategory');
        return this.usecase.getProducts(this.idCategoria);
      }))
    ).subscribe(
      response => {
        console.log(response);
        this.productsList = response;
      },
      error => console.log(error)
    )
  }


}
