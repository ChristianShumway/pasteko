import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { ProductoRecomendacionModel } from '../../../core/domain/producto-recomendacion.model';
@Component({
  selector: 'app-product-recommendation',
  templateUrl: './product-recommendation.component.html',
  styleUrls: ['./product-recommendation.component.scss']
})
export class ProductRecommendationComponent implements OnInit {

  @Input() recomendacion!: ProductoRecomendacionModel;
  @Output() productoSelected = new EventEmitter<ProductModel>();
  pathImage = 'assets/recomendaciones';
  srcImage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.srcImage = `${this.pathImage}/${this.recomendacion.imagen}.png`;
  }

  addToCart(producto: ProductModel) {
    this.productoSelected.emit(producto);
  }

}
