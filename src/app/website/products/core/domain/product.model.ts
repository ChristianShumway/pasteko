export interface ProductModel {
  cantidadPedida: number;
  codigo: string;
  descripcion: string;
  existencia: number;
  idSalida: number;
  imagen: string;
  informacion: string;
  linea: string;
  precio: number;
}

export interface SubCategoryModel {
  index: number;
  clave: string;
  nombre: string;
  category: string;
  claveCategory: string;
}
