import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductsPrimaryInterface } from '../ports/primary/products.primary.interface';
import { ProductsSecondaryInterface } from '../ports/secondary/products.secondary.interface';
import { ProductModel, SubCategoryModel } from '../domain/product.model';
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
    * @param claveCategoria clave de la categoría
    * @returns Array subcategorías
  */
  getSubcategories(claveCategoria: string | null): Observable<SubCategoryModel[]> {
    return this.secondary.getSubcategories(claveCategoria);
  }

  /**
    * @param claveCategoria clave de la categoría
    * @param subCategoria clave de la subcategoría perterneciente a la categoría
    * @param idVenta id de la venta en curso
    * @returns Array con productos de la categoría
  */
  getProducts(claveCategoria: string | null, subCategoria: string | null,  idVenta?: number): Observable<ProductModel[]> {
    return this.secondary.getProducts(claveCategoria, subCategoria, idVenta);
  }

  /**
    * @param idVenta id de la venta en curso
    * @returns Array con combos
  */
  getCombos(idVenta?: number): Observable<ProductModel[]> {
    return this.secondary.getCombos(idVenta);
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

  /**
  * @returns total productos seleccionados
  */
  watchStorage(): Observable<any> {
    return this.secondary.watchStorage();
  }

}
