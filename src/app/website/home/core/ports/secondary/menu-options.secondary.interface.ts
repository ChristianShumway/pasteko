
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionMenuModel } from '../../domain/menu-options.model';

@Injectable({
  providedIn: 'root',
})
export abstract class MenuOptionsSecondaryInterface {

  /**
  * @param none no recibe parámetros función
  * @returns Lista de opciones del menú principal de la sucursal
  */
  abstract getOptionsMenu(): Observable<OptionMenuModel[]>

}
