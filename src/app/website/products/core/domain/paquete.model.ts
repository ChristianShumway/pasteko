import { SubCategoryModel } from "./product.model";

export interface PaqueteModel {
  idCombo: number;
  familia: string;
  cantidad: number;
}

export interface StepPaqueteModel {
  step: number;
  idCombo: number;
  categoria: string;
  cantidad: number;
  cantidadSeleccionada: number;
  sub: SubCategoryModel[]
}

