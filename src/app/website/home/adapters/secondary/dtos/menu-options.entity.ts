export interface OptionMenuEntity {
  clave: string;
  nombre: string;
}

export interface ResponseOptionMenuEntity {
  mensaje:    string;
  estatus:    string;
  noEstatus:  number;
  pk:         number;
  response:   OptionMenuEntity[];
}
