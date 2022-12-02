import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';

declare var configuraciones: any;
let pathImg = configuraciones.pathImg;
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
  imageToShow: any;
  isImageLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usecase: ProductsPrimaryInterface
  ) { }

  ngOnInit(): void {
    this.product = this.data.product;
    this.type = this.data.type;
    this.getImageFromService();
  }

  getImage(img: string): string {
    if(img) {
      return `${this.pathImage}${img}`
    }
    return this.noImageProduct;
  }

  getImageFromService() {
    this.isImageLoading = true;
    let img = this.product.imagen ? this.product.imagen : this.noImageProduct;
    const urlImg = `${pathImg}${img}`;
    // const urlImg = `${pathImg}0101.png`;
    this.usecase.getImage(urlImg).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.imageToShow = this.noImageProduct;
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result ? reader.result : this.noImageProduct;
    }, false);
    if (image) {
        reader.readAsDataURL(image);
    }
  }

}
