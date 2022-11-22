import { ProductModel } from './product.model';

export interface SaleProductModel {
  idSalida: number;
  idVenta: number | null;
  codigo: string;
  cantidad: number;
  precio?: number;
  descuento?: number;
  impuesto?: number;
  costo?: number;
  idCombo: number;
  noCombo: number;
  viewProducto: ProductModel;
}

export interface ResponseSaleModel {
  estatus: string;
  mensaje: string;
  noEstatus: number;
  pk: number;
  response: ProductModel;
}
