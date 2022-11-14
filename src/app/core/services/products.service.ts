// import { ProductEntity } from './../dtos/product.entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductsMappers } from 'src/app/website/products/adapters/secondary/mappers/products.mapper';
import { CloseOrderEntity, OrderDetailtEntity } from 'src/app/website/orders/adapters/secondary/dtos/order-detail.entity';
@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {
  private mappers = new ProductsMappers();
  private cartStorage = new BehaviorSubject<number>(0);
  private orderReadyStorage = new BehaviorSubject<boolean>(false);
  private dataPurchaseStorage = new BehaviorSubject<object>({});

  purchase$ = this.dataPurchaseStorage.asObservable();

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
    return this.http.get<any>(req).pipe(
      distinctUntilChanged(),
      map( result => {
        let total = 0;
        result?.response?.detalle.forEach( (product: any) => {
          if(!product.detalle) {
            total +=  product?.cantidad;
          } else {
            total += 1;
          }
        })
        this.cartStorage.next(total);
        return total;
      })
    );
  }

  validateInputs(
    nameValid: boolean,
    name: string,
    emailValid: boolean,
    email: string,
    phoneValid: boolean,
    phone: string): Observable<boolean> {
    if(nameValid && emailValid && phoneValid) {
      this.orderReadyStorage.next(true);
      this.dataPurchaseStorage.next({name, email, phone});
      return of (true);
    } else {
      this.orderReadyStorage.next(false);
      return of (false);
    }
  }

  closeOrder(data: CloseOrderEntity): Observable<any> {
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<CloseOrderEntity>(`${environment.apiUrl}/venta/closeVenta`, JSON.stringify(data), {
      headers: headerss
    });
  }

  deleteIdPedido() {
    sessionStorage.removeItem('idPedido');
  }

}
