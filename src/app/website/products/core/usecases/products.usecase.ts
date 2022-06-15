import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductsPrimaryInterface } from '../ports/primary/products.primary.interface';
import { ProductsSecondaryInterface } from '../ports/secondary/products.secondary.interface';
import { ProductModel } from '../domain/product.model';
import { ResponseSaleModel, SaleProductModel } from '../domain/sale-product.model';

@Injectable({
	providedIn: 'root',
})
export class ProductsUsecase extends ProductsPrimaryInterface {


	constructor(
		private secondary: ProductsSecondaryInterface) {
		super();
	}

  /**
  * @returns id venta
  */
  getIdPedido(): Observable<number | null> {
    return this.secondary.getIdPedido();
  }

  /**
  * @param id id de la línea a cargar
  * @param  idVenta id de la venta en curso
  * @returns Array con productos de la línea
  */
  getProducts(id: string, idPedido?: number): Observable<ProductModel[]> {
    return this.secondary.getProducts(id, idPedido);
  }

  /**
  * @param objeto con data del producto a agregar, modificar o quitar del pedido
  * @returns pendiente
  */
  productSale(product: SaleProductModel): Observable<ResponseSaleModel> {
    return this.secondary.productSale(product);
  }

  /**
  *
  */
  deleteIdPedido(): void {
    return this.secondary.deleteIdPedido();
  }

}
