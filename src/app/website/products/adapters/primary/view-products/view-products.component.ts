import { ProductModel } from './../../../core/domain/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  productsList: ProductModel[] = [];
  @Input() set products(data: ProductModel[]) {
    if(data) {
      this.productsList = data;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
