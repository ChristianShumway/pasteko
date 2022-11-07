import { ProductModel } from 'src/app/website/products/core/domain/product.model';

export interface ProductoRecomendacionModel {
  articulo: string;
  imagen: string;
  producto: ProductModel;
}
