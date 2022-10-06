import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductModel } from './../../../core/domain/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  countProduct!: FormControl;
  productItem!: ProductModel;
  noExistencias: boolean = false;
  @Input() set product (data: ProductModel) {
    if(data) {
      this.productItem = data;
    }
  }
  @Output() productSelected = new EventEmitter<ProductModel>();
  @Output() infoProduct = new EventEmitter<ProductModel>();

  constructor() { }

  ngOnInit(): void {
    this.countProduct = new FormControl(this.productItem?.cantidadPedida, [Validators.minLength(0)])
    this.countProduct.valueChanges.subscribe({
      next: response  => {
        this.productItem.cantidadPedida = response;
        this.productSelected.emit(this.productItem);
      }
    });
    this.noExistencias = this.productItem.existencia === 0 ? true : false;
  }

  showInfo(product: ProductModel) {
    this.infoProduct.emit(product);
  }

}
