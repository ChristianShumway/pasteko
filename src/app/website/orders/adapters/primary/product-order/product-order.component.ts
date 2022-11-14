import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductOrderModel } from './../../../core/domain/order-detail.model';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent implements OnInit {
  productOrder!: any
  @Input() set product(data: ProductOrderModel) {
    if(data) {
      this.productOrder = data;
    }
  }
  @Output() productSelected = new EventEmitter<ProductOrderModel>();
  @Output() deleteProduct = new EventEmitter<ProductOrderModel>();
  countProduct!: FormControl;
  canSelected: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if(!this.productOrder.detalle) {
      this.canSelected = this.productOrder.viewProducto.existencia > 0 ? true : false;
      this.countProduct = new FormControl(this.productOrder?.cantidad);
      this.countProduct.valueChanges.subscribe({
        next: response  => {
          this.productOrder.cantidad = response.currentValue;
          this.productSelected.emit(this.productOrder);
          this.canSelected = this.productOrder.viewProducto.existencia > 0 ? true : false;
        }
      });
    } else {
      this.countProduct = new FormControl(1);
    }
  }

  deleteProductOrder(product: ProductOrderModel) {
    this.deleteProduct.emit(product);
  }

  getContenido(contenidoCombo: ProductOrderModel[]) {
    let productText = ''
    contenidoCombo.forEach( (product, i) => {
      productText += ` ${product.viewProducto.descripcion.toLowerCase()}, `;
      productText = contenidoCombo.length === i+1 ? productText.substring(0, productText.length - 2) : productText;
    });
    return productText;
  }

}
