import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';

declare var configuraciones: any;
let pathImg = configuraciones.pathImg;
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
  imageToShow: any;
  isImageLoading: boolean = false;

  constructor(
    private usecase: ProductsPrimaryInterface
  ) { }

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
