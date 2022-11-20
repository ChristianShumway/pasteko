import { Injectable } from '@angular/core';
import { SaleSecondaryInterface } from '../../../core/ports/secondary/sale.secondary.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseOrderDetailtModel } from '../../../core/domain/order-detail.model';
import { OrderDetailtEntity } from '../dtos/order-detail.entity';
// import { OrderDetailMappers } from '../mappers/order-detail.mapper';
import { ProductoRecomendacionModel } from '../../../core/domain/producto-recomendacion.model';
import { ResultRecomendacionEntity } from '../dtos/producto.recomentacion.entity';
import { ProductsMappers } from 'src/app/website/products/adapters/secondary/mappers/products.mapper';
import { RecomendacionesMappers } from '../mappers/producto-recomendacion.mapper';

@Injectable({
  providedIn: 'root'
})
export class SaleService extends SaleSecondaryInterface {

  // private mappers = new OrderDetailMappers();
  private recomendacionMapper = new  RecomendacionesMappers();
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  deleteSale(idPedido: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/venta/delteProcutoVenta/${idPedido}`);
  }

  getCurrentSale(idPedido: number): Observable<ResponseOrderDetailtModel> {
    return this.http.get<OrderDetailtEntity>(`${environment.apiUrl}/venta/getVentaByIdVenta/${idPedido}`)
    .pipe(
      distinctUntilChanged(),
      // map( data => this.mappers.mapFromProducts(data.response))
      map( data => data.response)
    );
  }

  getRecomendaciones(idPedido: number): Observable<ProductoRecomendacionModel[]> {
    return this.http.get<ResultRecomendacionEntity>(`${environment.apiUrl}/dashboard/getRecomendaciones/${idPedido}`)
    .pipe(
      map( data => this.recomendacionMapper.mapFromRecomendaciones(data.response) )
    );
  }

  deleteProductOrder(idPedido: number, idSalida: number): Observable<any> {
    const url = `${environment.apiUrl}/venta/deleteDetVenta/${idPedido}/${idSalida}`;
    return this.http.get<any>(url);
  }

}



