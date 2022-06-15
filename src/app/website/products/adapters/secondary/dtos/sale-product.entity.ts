import { ProductEntity } from './product.entity';

export interface SaleProductEntity {
  idSalida: number;
  idVenta: number;
  codigo: string;
  cantidad: number;
  precio?: number;
  descuento?: number;
  impuesto?: number;
  costo?: number;
  viewProducto: ProductEntity[];
}
