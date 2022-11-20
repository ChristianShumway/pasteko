import { ProductEntity } from './../dtos/product.entity';
import { Injectable } from '@angular/core';
import { ProductsSecondaryInterface } from '../../../core/ports/secondary/products.secondary.interface';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ProductModel, SubCategoryModel } from '../../../core/domain/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaqueteMappers } from '../mappers/paquete.mapper';
import { ProductsMappers } from '../mappers/products.mapper';
import { ResultProductEntity } from '../dtos/product.entity';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SaleProductModel, ResponseSaleModel } from '../../../core/domain/sale-product.model';
import { PaqueteSecondaryInterface } from '../../../core/ports/secondary/paquete.secondary.interface';
import { PaqueteModel } from '../../../core/domain/paquete.model';
import { ResultPaqueteEntity } from '../dtos/paquete.entity';


@Injectable({
  providedIn: 'root'
})
export class PaqueteService extends PaqueteSecondaryInterface {
  private mappers = new PaqueteMappers();
  private mappersProduct = new ProductsMappers();

  constructor(
  private http: HttpClient
  ) {
    super();
  }

  getCombos(idVenta?: number): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getCombos/${idVenta}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      map( result => {
        sessionStorage.setItem('idPedido', `${idVenta}`);
        return this.mappersProduct.mapFromProducts(result?.response);
      })
    );
  }

  getDetalleCombo(codigoPaquete: string): Observable<PaqueteModel[]> {
    const req = `${environment.apiUrl}/dashboard/getDetalleCombo/${codigoPaquete}`;
    return this.http.get<ResultPaqueteEntity>(req).pipe(
      distinctUntilChanged(),
      map( result => {
        // sessionStorage.setItem('idPedido', `${idVenta}`);
        return this.mappers.mapFromDetallePaquete(result?.response);
      })
    );
  }

  getNumeroCombo(idVenta: number, noCombo: string): Observable<number> {
    const req = `${environment.apiUrl}/venta/getNoComboEnVenta/${idVenta}/${noCombo}`;
    return this.http.get<any>(req).pipe(
      map( data => data.response)
    );
  }

}
