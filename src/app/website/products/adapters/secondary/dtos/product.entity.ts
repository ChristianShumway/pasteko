export interface ProductEntity {
  cantidadPedida: number;
  cantidadCombo: number;
  codigo: string;
  descripcion: string;
  existencia: number;
  disponible: boolean;
  idSalida: number;
  imagen: string;
  informacion: string;
  linea: string;
  precio: number;
  idCombo: number;
  noCombo: number;
}

export interface ResultProductEntity {
  mensaje: string | null;
  estatus: string;
  noEstatus: number;
  pk: number;
  response: ProductEntity[];
}
