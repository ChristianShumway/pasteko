import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';

@Component({
  selector: 'app-product-pack',
  templateUrl: './product-pack.component.html',
  styleUrls: ['./product-pack.component.scss']
})
export class ProductPackComponent implements OnInit {
  countProduct!: FormControl;
  @Input() product!: ProductModel;
  @Input() canSelected!: boolean;
  @Output() productSelected = new EventEmitter<ProductModel>();
  @Output() actionSelected = new EventEmitter<string>();
  // totalProductsSelected: number = 0;
  // canSelected: boolean = true;

  pathImage: string = 'assets/menu/';
  noImageProduct: string = 'assets/icons/no-product.png';
  noExistencias: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.countProduct = new FormControl(this.product?.cantidadPedida, [Validators.minLength(0)])
    this.countProduct.valueChanges.subscribe({
      next: response  => {
        this.product.cantidadPedida = response.currentValue;
        this.productSelected.emit(this.product);
        this.actionSelected.emit(response.action)
      }
    });
    this.noExistencias = this.product.existencia === 0 ? true : false;
  }

  getImage(img: string): string {
    if(img) {
      return `${this.pathImage}${img}`
    }
    return this.noImageProduct;
  }

}
