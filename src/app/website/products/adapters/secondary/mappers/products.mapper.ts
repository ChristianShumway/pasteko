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
        codigo: p.codigo,
        descripcion: p.descripcion,
        linea: p.linea,
        imagen: p.imagen,
        count: 0
      });
    });

		return products;
	}

}
