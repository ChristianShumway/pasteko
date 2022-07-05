import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductOrderModel } from './../../../core/domain/order-detail.model';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent implements OnInit {
  productOrder!: ProductOrderModel
  @Input() set product(data: ProductOrderModel) {
    if(data) {
      this.productOrder = data;
    }
  }
  @Output() productSelected = new EventEmitter<ProductOrderModel>();
  @Output() deleteProduct = new EventEmitter<ProductOrderModel>();
  countProduct!: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.countProduct = new FormControl(this.productOrder?.cantidad);
    this.countProduct.valueChanges.subscribe({
      next: response  => {
        this.productOrder.cantidad = response;
        this.productSelected.emit(this.productOrder);
      }
    });
  }

  deleteProductOrder(product: ProductOrderModel) {
    product.cantidad = 0;
    this.deleteProduct.emit(product);
  }

}
