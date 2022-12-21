import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductModel } from './../../../core/domain/product.model';
import { ProductsPrimaryInterface } from '../../../core/ports/primary/products.primary.interface';

declare var configuraciones: any;
let pathImg = configuraciones.pathImg;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  countProduct!: FormControl;
  productItem!: ProductModel;
  noExistencias: boolean = false;
  noImageProduct: string = 'no-product.png';
  isCombo: boolean = false;
  canSelected: boolean = true;
  imageToShow: any;
  isImageLoading: boolean = false;
  @Input() set product (data: ProductModel) {
    if(data) {
      this.productItem = data;
      this.isCombo = this.productItem.linea === 'Combos' ? true : false;
    }
  }
  @Output() productSelected = new EventEmitter<ProductModel>();
  @Output() infoProduct = new EventEmitter<ProductModel>();
  @Output() comboSelected = new EventEmitter<string>();

  constructor(
    private usecase: ProductsPrimaryInterface
  ) { }

  ngOnInit(): void {
    this.getImageFromService();
    this.countProduct = new FormControl((this.productItem?.cantidadPedida), [Validators.minLength(0)]);
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

  quieroElCombo(codigo: string) {
    this.comboSelected.emit(codigo)
  }

  getImageFromService() {
    this.isImageLoading = true;
    let img = this.productItem.imagen ? this.productItem.imagen : this.noImageProduct;
    const urlImg = `${pathImg}${img}`;
    // const urlImg = `${pathImg}0101.png`;
    this.usecase.getImage(urlImg).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.imageToShow = 'assets/icons/no-product.png';
      this.isImageLoading = false;
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result ? reader.result : 'assets/icons/no-product.png';
    }, false);
    if (image) {
        reader.readAsDataURL(image);
    }
  }

}
