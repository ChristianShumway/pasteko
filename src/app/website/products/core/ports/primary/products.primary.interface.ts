import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel, SubCategoryModel } from '../../domain/product.model';
import { ResponseSaleModel, SaleProductModel } from './../../domain/sale-product.model';

@Injectable({
  providedIn: 'root',
})
export abstract class ProductsPrimaryInterface {

  /**
  * @returns id venta
  */
  abstract getIdPedido(): Observable<number | null>

  /**
    * @param claveCategoria clave de la categoría
    * @returns Array subcategorías
  */
  abstract getSubcategories(claveCategoria: string | null): Observable<SubCategoryModel[]>

  /**
    * @param claveCategoria clave de la categoría
    * @param subCategoria clave de la subcategoría perterneciente a la categoría
    * @param idVenta id de la venta en curso
    * @returns Array con productos de la categoría
  */
  abstract getProducts(claveCategoria: string | null, subCategoria: string | null, idVenta?: number): Observable<ProductModel[]>

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


  abstract getImage(imgUrl: string): Observable<Blob>;

}
