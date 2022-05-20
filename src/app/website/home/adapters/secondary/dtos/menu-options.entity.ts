export interface OptionMenuEntity {
  idLinea:      string;
  descripcion:  string;
  descuento:    number;
  numero:       number;
  rutaNombre:   string;
  cantAutDeus:  number;
  bloqueada:    number;
  impoComision: number;
}

export interface ResponseOptionMenuEntity {
  mensaje:    string;
  estatus:    string;
  noEstatus:  number;
  pk:         number;
  response:   OptionMenuEntity[];
}
