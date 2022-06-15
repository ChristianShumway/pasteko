import { ProductEntity } from './../dtos/product.entity';
import { Injectable } from '@angular/core';
import { ProductsSecondaryInterface } from '../../../core/ports/secondary/products.secondary.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductModel } from '../../../core/domain/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsMappers } from '../mappers/products.mapper';
import { ResultProductEntity } from '../dtos/product.entity';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SaleProductModel, ResponseSaleModel } from '../../../core/domain/sale-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsSecondaryInterface {
  private mappers = new ProductsMappers();
  private cart = new BehaviorSubject <number>(0);
  cart$ = this.cart.asObservable();

  constructor(
  private http: HttpClient
  ) {
    super();
  }

  getIdPedido(): Observable<number | null> {
  const session = sessionStorage.getItem('idPedido')
    if (session) {
      return of (parseInt(session))
    }
    return of (null);
  }

  getProducts(idLinea: string, idPedido: number = 0): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getProductoByLinea/${idLinea}/${idPedido}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      map( result => {
        sessionStorage.setItem('idPedido', `${idPedido}`);
        this.getTotalAcount(result?.response);
        return this.mappers.mapFromProducts(result?.response);
      })
    );
  }

  productSale(product: SaleProductModel): Observable<ResponseSaleModel> {
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ResponseSaleModel>(`${environment.apiUrl}/venta/saveProducto`, JSON.stringify(product), {
      headers: headerss
    }).pipe(
      map( result => {
        return result;
      })
    );
  }

  deleteIdPedido() {
    sessionStorage.removeItem('idPedido');
  }

  getTotalAcount(products: ProductEntity[]){
    let total = 0;
    products.forEach( product => {
      if(product?.cantidadPedida > 0) {
        total +=  product?.cantidadPedida;
      }
    });
    console.log(total);
    this.cart.next(total);
  }

}
