import { Injectable } from '@angular/core';
import { ResponseOrderDetailtEntity } from '../dtos/order-detail.entity';
import { ProductOrderModel, ResponseOrderDetailtModel } from '../../../core/domain/order-detail.model';
import { ProductModel } from './../../../../products/core/domain/product.model';

@Injectable({
	providedIn: 'root',
})

export class OrderDetailMappers {
	constructor() {
		// constructor
	}

	mapFromProducts(params: ResponseOrderDetailtEntity): ResponseOrderDetailtModel {
		const products: ProductOrderModel[] = [];
    params.detalle.forEach( p => {
      products.push({
        cantidad: p.cantidad,
        codigo: p.codigo,
        costo: p.costo,
        descuento: p.descuento,
        idSalida: p.idSalida,
        idVenta: p.idVenta,
        impuesto: p.impuesto,
        precio: p.precio,
        viewProducto: p.viewProducto
      });
    });

    const response: ResponseOrderDetailtModel = {
      estado: params.estado,
      fechaEmision: params.fechaEmision,
      idVenta: params.idVenta,
      ocupado: params.ocupado,
      serie: params.serie,
      tipoDocumento: params.tipoDocumento,
      detalle: products
    }

		return response;
	}

}
