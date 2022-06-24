// import { ProductEntity } from './../dtos/product.entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductsMappers } from 'src/app/website/products/adapters/secondary/mappers/products.mapper';
import { ProductEntity, ResultProductEntity } from 'src/app/website/products/adapters/secondary/dtos/product.entity';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { OrderDetailtEntity } from 'src/app/website/orders/adapters/secondary/dtos/order-detail.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {
  private mappers = new ProductsMappers();
  private cartStorage = new BehaviorSubject<number>(0);
  private orderReadyStorage = new BehaviorSubject<boolean>(false);

  constructor(
  private http: HttpClient
  ) {}

  watchStorage(): Observable<any> {
    return this.cartStorage.asObservable();
  }

  watchOrderReadyStorage(): Observable<any> {
    return this.orderReadyStorage.asObservable();
  }

  getIdPedido(): Observable<number | null> {
  const session = sessionStorage.getItem('idPedido')
    if (session) {
      return of (parseInt(session))
    }
    return of (null);
  }

  getTotalProducts(idPedido: number = 0): Observable<number> {
    const req = `${environment.apiUrl}/venta/getVentaByIdVenta/${idPedido}`;
    return this.http.get<OrderDetailtEntity>(req).pipe(
      map( result => {
        let total = 0;
        result?.response?.detalle.forEach( product => {
          if(product?.cantidad > 0) {
            total +=  product?.cantidad;
          }
        })
        this.cartStorage.next(total);
        return total;
      })
    );
  }

  validateInputs(nameValid: boolean, emailValid: boolean): Observable<boolean> {
    if(nameValid && emailValid) {
      this.orderReadyStorage.next(true);
      return of (true);
    } else {
      this.orderReadyStorage.next(false);
      return of (false);
    }
  }

}
