
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../domain/product.model';
import { ResponseSaleModel, SaleProductModel } from '../../domain/sale-product.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProductsSecondaryInterface {

  /**
  * @returns id venta
  */
  abstract getIdPedido(): Observable<number | null>

  /**
  * @param id id de la línea a cargar
  * @param  idVenta id de la venta en curso
  * @returns Array con productos de la línea
  */
  abstract getProducts(id: string | null, idPedido?: number): Observable<ProductModel[]>

  /**
  * @param objeto con data del producto a agregar, modificar o quitar del pedido
  * @returns pendiente
  */
  abstract productSale(product: SaleProductModel): Observable<ResponseSaleModel>

  /**
  *
  */
  abstract deleteIdPedido(): void

  /**
  * @returns total productos seleccionados
  */
  abstract watchStorage(): Observable<any>;

}
