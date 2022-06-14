import { Injectable } from '@angular/core';
import { ProductsSecondaryInterface } from '../../../core/ports/secondary/products.secondary.interface';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../../../core/domain/product.model';
import { HttpClient } from '@angular/common/http';
import { ProductsMappers } from '../mappers/products.mapper';
import { ResultProductEntity } from '../dtos/product.entity';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsSecondaryInterface {

  private mappers = new ProductsMappers();

  constructor(
  private http: HttpClient
  ) {
    super();
  }

  getProducts(idLinea: string, idVenta: number = 0): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getProductoByLinea/${idLinea}/${idVenta}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      map( result => {
        sessionStorage.setItem('idPedido', `${result?.pk}`);
        return this.mappers.mapFromProducts(result.response);
      })
    );
  }

}
