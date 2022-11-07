import { ProductEntity } from 'src/app/website/products/adapters/secondary/dtos/product.entity';

export interface ProductoRecomendacionEntity {
  articulo: string;
  imagen: string;
  producto: ProductEntity;
}

export interface ResultRecomendacionEntity {
  estatus: string;
  mensaje: string;
  noEstatus: number;
  pk: number;
  response: ProductoRecomendacionEntity[];
}
