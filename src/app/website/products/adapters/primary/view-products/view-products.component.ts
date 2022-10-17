import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel, SubCategoryModel } from './../../../core/domain/product.model';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  productsList: ProductModel[] = [];
  subCategoriesList: SubCategoryModel[] = [];
  tabActive: number = 0;
  @Input()category : string | null = null;
  @Input() set products(data: ProductModel[]) {
    if(data) {
      this.productsList = data;
    }
  }
  @Input() set subcategories(data: SubCategoryModel[]) {
    if(data) {
      this.tabActive = 0;
      this.subCategoriesList = data;
    }
  }
  @Output() product = new EventEmitter<ProductModel>();
  @Output() infoProduct = new EventEmitter<ProductModel>();
  @Output() claveSubCat = new EventEmitter<string | undefined>();

  constructor() { }

  ngOnInit(): void {
  }

  onGetProductSelected(product: ProductModel) {
    this.product.emit(product);
  }

  onGetInfoProduct(productInfo: ProductModel) {
    this.infoProduct.emit(productInfo);
  }

  changeTab(index: number, clave: string | undefined) {
    this.tabActive = index;
    this.claveSubCat.emit(clave);
  }

}
