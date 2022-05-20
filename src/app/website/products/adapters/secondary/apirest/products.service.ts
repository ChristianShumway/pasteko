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

  getProducts(id: string): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getProductoByLinea/${id}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      map( result => this.mappers.mapFromProducts(result.response))
    );
  }

}
