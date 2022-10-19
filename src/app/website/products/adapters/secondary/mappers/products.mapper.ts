import { Injectable } from '@angular/core';
import { ProductEntity } from '../dtos/product.entity';
import { ProductModel } from '../../../core/domain/product.model';

@Injectable({
	providedIn: 'root',
})

export class ProductsMappers {
	constructor() {
		// constructor
	}

	mapFromProducts(params: ProductEntity[]): ProductModel[] {
		const products: ProductModel[] = [];

    params.forEach( p => {
      products.push({
        cantidadPedida: p.cantidadPedida,
        codigo: p.codigo,
        descripcion: p.descripcion,
        existencia: p.existencia,
        idSalida: p.idSalida,
        imagen: p.imagen,
        informacion: p.informacion,
        linea: p.linea,
        precio: p.precio,
      });
    });

		return products;
	}

}
