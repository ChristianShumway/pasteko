import { Injectable } from '@angular/core';
import { PaqueteEntity } from '../dtos/paquete.entity';
import { PaqueteModel } from '../../../core/domain/paquete.model';

@Injectable({
	providedIn: 'root',
})

export class PaqueteMappers {
	constructor() {
		// constructor
	}

	mapFromDetallePaquete(params: PaqueteEntity[]): PaqueteModel[] {
		const paquete: PaqueteModel[] = [];

    params.forEach( p => {
      paquete.push({
        idCombo: p.idCombo,
        familia: p.familia,
        cantidad: p.cantidad
      });
    });

		return paquete;
	}

}
