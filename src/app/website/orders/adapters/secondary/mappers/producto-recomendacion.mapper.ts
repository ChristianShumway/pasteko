import { Injectable } from '@angular/core';
import { ResponseOrderDetailtEntity } from '../dtos/order-detail.entity';
import { ProductOrderModel, ResponseOrderDetailtModel } from '../../../core/domain/order-detail.model';
import { ProductoRecomendacionEntity } from '../dtos/producto.recomentacion.entity';
import { ProductoRecomendacionModel } from '../../../core/domain/producto-recomendacion.model';

@Injectable({
	providedIn: 'root',
})

export class RecomendacionesMappers {
	constructor() {
		// constructor
	}

	mapFromRecomendaciones(params: ProductoRecomendacionEntity[]): ProductoRecomendacionModel[] {
		const result: ProductoRecomendacionModel[] = [];
    params.forEach( p => {
      result.push({
        articulo: p.articulo,
        imagen: p.imagen,
        producto:  {
          codigo: p.producto.codigo,
          descripcion: p.producto.descripcion,
          linea: p.producto.linea,
          imagen: p.producto.imagen,
          precio: p.producto.precio,
          existencia: p.producto.existencia,
          cantidadPedida: p.producto.cantidadPedida,
          idSalida: p.producto.idSalida,
          informacion: p.producto.informacion,
          idCombo: p.producto.idCombo,
          noCombo: p.producto.noCombo
        }
      });
    });

		return result;
	}
}
