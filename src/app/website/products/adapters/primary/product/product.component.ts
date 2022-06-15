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
  @Input() set product (data: ProductModel) {
    if(data) {
      this.productItem = data;
    }
  }
  @Output() productSelected = new EventEmitter<ProductModel>();


  constructor() { }

  ngOnInit(): void {
    this.countProduct = new FormControl(this.productItem?.cantidadPedida, [Validators.minLength(0)])
    this.countProduct.valueChanges.subscribe({
      next: response  => {
        this.productItem.cantidadPedida = response;
        this.productSelected.emit(this.productItem);
      }
    });
  }

}
