// import { Injectable } from '@angular/core';
// import { ResponseOrderDetailtEntity } from '../dtos/order-detail.entity';
// import { ProductOrderModel, ResponseOrderDetailtModel } from '../../../core/domain/order-detail.model';
// import { ProductModel } from './../../../../products/core/domain/product.model';

// @Injectable({
// 	providedIn: 'root',
// })

// export class OrderDetailMappers {
// 	constructor() {
// 		// constructor
// 	}

// 	mapFromProducts(params: ResponseOrderDetailtEntity): ResponseOrderDetailtModel {
// 		const products: ProductOrderModel[] = [];
//     console.log('mapper', params);
//     params.detalle.forEach( p => {
//       if(p.)
//       products.push({
//         cantidad: p.idD,
//         codigo: p.codigo,
//         costo: p.costo,
//         descuento: p.descuento,
//         idSalida: p.idSalida,
//         idVenta: p.idVenta,
//         impuesto: p.impuesto,
//         precio: p.precio,
//         idCombo: p.idCombo,
//         viewProducto: p.viewProducto
//       });
//     });

//     const response: ResponseOrderDetailtModel = {
//       idVenta: params.idVenta,
//       ocupado: params.ocupado,
//       tipoDocumento: params.tipoDocumento,
//       serie: params.serie,
//       fechaEmision: params.fechaEmision,
//       estado: params.estado,
//       telfono: params.telfono,
//       correo: params.correo,
//       nombre: params.nombre,
//       noReferencia: params.noReferencia,
//       detalle:  products
//     }

// 		return params;
// 	}

// }
