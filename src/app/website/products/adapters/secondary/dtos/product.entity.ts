export interface ProductEntity {
  codigo: string;
  descripcion: string;
  linea: string;
  imagen: string;
}

export interface ResultProductEntity {
  mensaje: string | null;
  estatus: string;
  noEstatus: number;
  pk: number;
  response: ProductEntity[];
}
