export interface ProductEntity {
  cantidadPedida: number;
  codigo: string;
  descripcion: string;
  existencia: number;
  idSalida: number;
  imagen: string;
  linea: string;
  precio: number;
}

export interface ResultProductEntity {
  mensaje: string | null;
  estatus: string;
  noEstatus: number;
  pk: number;
  response: ProductEntity[];
}
