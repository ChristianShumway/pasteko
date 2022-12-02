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
  idCombo: number;
  noCombo: number;
  caja: string;
  estacion: string;
  viewProducto: ProductEntity[];
}
