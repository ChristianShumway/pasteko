import { ProductModel } from './../../../core/domain/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
  };


  constructor() { }

  ngOnInit(): void {
    this.countProduct = new FormControl(this.productItem?.cantidadPedida, [Validators.minLength(0)])
    this.countProduct.valueChanges.subscribe({
      next: response  => {
        console.log(response);
      }
    });
  }

}
