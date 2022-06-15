export interface OrderDetailtEntity {
  estatus: string;
  mensaje: string;
  noEstatus: number;
  pk: number;
  response: ResponseOrderDetailtEntity
}

export interface ResponseOrderDetailtEntity {
  detalle: ProductOrderEntity[];
  estado: string;
  fechaEmision: string;
  idVenta: number;
  ocupado: number;
  serie: string;
  tipoDocumento: string;
}

export interface ProductOrderEntity {
  cantidad: number;
  codigo: string;
  costo: number;
  descuento: number;
  idSalida: number;
  idVenta: number;
  impuesto: number;
  precio: number;
}

