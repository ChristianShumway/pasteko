import { ProductEntity } from 'src/app/website/products/adapters/secondary/dtos/product.entity';
export interface OrderDetailtEntity {
  estatus: string;
  mensaje: string;
  noEstatus: number;
  pk: number;
  response: ResponseOrderDetailtEntity
}

export interface ResponseOrderDetailtEntity {
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
  detalle: ProductOrderEntity[] | ComboOrderEntity[];
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
  idCombo: number;
  viewProducto: ProductEntity;
}

export  interface ComboOrderEntity {
  idCombo: number;
  descripcion: string;
  precio: number;
  detalle: ProductOrderEntity[]
}

export interface CloseOrderEntity {
  idVenta: number;
  correo: string;
  telefono: string;
  nombre: string;
}

