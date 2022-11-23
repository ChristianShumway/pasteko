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
  pathImage: string = 'assets/menu/';
  noImageProduct: string = 'assets/icons/no-product.png';
  isCombo: boolean = false;
  canSelected: boolean = true;
  @Input() set product (data: ProductModel) {
    if(data) {
      this.productItem = data;
      this.isCombo = this.productItem.linea === 'Combos' ? true : false;
    }
  }
  @Output() productSelected = new EventEmitter<ProductModel>();
  @Output() infoProduct = new EventEmitter<ProductModel>();
  @Output() comboSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.countProduct = new FormControl(this.productItem?.cantidadPedida, [Validators.minLength(0)]);
    this.canSelected = this.productItem.existencia > 0 || this.productItem.disponible ? true : false;
    this.countProduct.valueChanges.subscribe({
      next: response  => {
        console.log(response)
        this.productItem.cantidadPedida = response.currentValue;
        this.canSelected = this.productItem.existencia > 0 || this.productItem.disponible ? true : false;
        this.productSelected.emit(this.productItem);
      }
    });
    this.noExistencias = this.productItem.existencia === 0 ? true : false;
  }

  showInfo(product: ProductModel) {
    this.infoProduct.emit(product);
  }

  getImage(img: string): string {
    if(img) {
      return `${this.pathImage}${img}`
    }
    return this.noImageProduct;
  }

  quieroElCombo(codigo: string) {
    this.comboSelected.emit(codigo)
  }

}
