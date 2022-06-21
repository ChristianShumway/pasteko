// import { ProductEntity } from './../dtos/product.entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductsMappers } from 'src/app/website/products/adapters/secondary/mappers/products.mapper';
import { ProductEntity, ResultProductEntity } from 'src/app/website/products/adapters/secondary/dtos/product.entity';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSharedService {
  private mappers = new ProductsMappers();
  private cartStorage = new BehaviorSubject<number>(0);

  constructor(
  private http: HttpClient
  ) {}

  watchStorage(): Observable<any> {
    return this.cartStorage.asObservable();
  }

  getIdPedido(): Observable<number | null> {
  const session = sessionStorage.getItem('idPedido')
    if (session) {
      return of (parseInt(session))
    }
    return of (null);
  }

  getProducts(idLinea: string | null, idPedido: number = 0): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getProductoByLinea/${idLinea}/${idPedido}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      map( result => {
        sessionStorage.setItem('idPedido', `${idPedido}`);
        this.getTotalAcount(result?.response);
        this.watchStorage();
        return this.mappers.mapFromProducts(result?.response);
      })
    );
  }


  getTotalAcount(products: ProductEntity[]){
    let total = 0;
    products.forEach( product => {
      if(product?.cantidadPedida > 0) {
        total +=  product?.cantidadPedida;
      }
    });
    // console.log(total)
    this.cartStorage.next(total);
  }

}
