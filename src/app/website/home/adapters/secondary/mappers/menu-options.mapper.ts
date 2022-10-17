import { Injectable } from '@angular/core';
import { OptionMenuEntity } from '../dtos/menu-options.entity';
import { OptionMenuModel } from '../../../core/domain/menu-options.model';

@Injectable({
	providedIn: 'root',
})

export class MenuOptionsMappers {
	constructor() {
		// constructor
	}

	mapFromMenuOptions(param: OptionMenuEntity[]): OptionMenuModel[] {
		const options: OptionMenuModel[] = [];
		param.forEach((p) => {
			options.push({
        clave: p.clave,
        nombre: p.nombre
			});
		});

		return options;
	}

}
