import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuOptionsPrimaryInterface } from '../ports/primary/menu-options.primary.interface';
import { MenuOptionsSecondaryInterface } from '../ports/secondary/menu-options.secondary.interface';
import { OptionMenuModel } from '../domain/menu-options.model';

@Injectable({
	providedIn: 'root',
})
export class MenuOptionsUsecase extends MenuOptionsPrimaryInterface {

	constructor(
		private secondary: MenuOptionsSecondaryInterface) {
		super();
	}

	/**
  * @param none no recibe parámetros función
  * @returns Lista de opciones del menú principal de la sucursal
  */
  getOptionsMenu(): Observable<OptionMenuModel[]> {
		return this.secondary.getOptionsMenu();
	}

}
