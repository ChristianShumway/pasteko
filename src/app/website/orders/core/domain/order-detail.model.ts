import { ProductModel } from "src/app/website/products/core/domain/product.model";
export interface OrderDetailtModel {
  estatus: string;
  mensaje: string;
  noEstatus: number;
  pk: number;
  response: ResponseOrderDetailtModel
}

export interface ResponseOrderDetailtModel {
  idVenta: number;
  ocupado: number;
  tipoDocumento: string;
  serie: string;
  fechaEmision: string;
  estado: string;
  telfono: string;
  correo: string;
  nombre: string;
  noReferencia: number;
  detalle: ProductOrderModel[] | ComboOrderModel[];
}

export interface ProductOrderModel {
  cantidad: number;
  codigo: string;
  costo: number;
  descuento: number;
  idSalida: number;
  idVenta: number;
  impuesto: number;
  precio: number;
  idCombo: number;
  viewProducto: ProductModel;
}

export  interface ComboOrderModel {
  idCombo: number;
  descripcion: string;
  precio: number;
  detalle: ProductOrderModel[]
}
