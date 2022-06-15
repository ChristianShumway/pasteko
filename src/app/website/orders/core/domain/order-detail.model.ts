export interface OrderDetailtModel {
  estatus: string;
  mensaje: string;
  noEstatus: number;
  pk: number;
  response: ResponseOrderDetailtModel
}

export interface ResponseOrderDetailtModel {
  detalle: ProductOrderModel[];
  estado: string;
  fechaEmision: string;
  ocupado: number;
  idVenta: number;
  serie: string;
  tipoDocumento: string;
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
}
