import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from './../../../core/domain/product.model';

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
  @Output() product = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
  }

  onGetProductSelected(product: ProductModel) {
    this.product.emit(product);
  }

}
