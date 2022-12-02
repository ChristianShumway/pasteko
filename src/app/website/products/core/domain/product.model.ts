export interface ProductModel {
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

export interface SubCategoryModel {
  index: number;
  clave: string;
  nombre: string;
  category: string;
  claveCategory: string;
}
