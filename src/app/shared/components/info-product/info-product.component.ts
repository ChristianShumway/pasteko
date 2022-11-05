import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {

  product!: ProductModel;
  type!: string;
  pathImage: string = 'assets/menu/';
  noImageProduct: string = 'assets/icons/no-product.png';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.product = this.data.product;
    this.type = this.data.type;
  }

  getImage(img: string): string {
    if(img) {
      return `${this.pathImage}${img}`
    }
    return this.noImageProduct;
  }

}
