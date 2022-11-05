export interface PaqueteEntity {
  idCombo: number;
  familia: string;
  cantidad: number;
}


export interface ResultPaqueteEntity {
  mensaje: string | null;
  estatus: string;
  noEstatus: number;
  pk: number;
  response: PaqueteEntity[];
}
