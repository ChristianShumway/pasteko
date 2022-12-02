import { ProductEntity } from './../dtos/product.entity';
import { Injectable } from '@angular/core';
import { ProductsSecondaryInterface } from '../../../core/ports/secondary/products.secondary.interface';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ProductModel, SubCategoryModel } from '../../../core/domain/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsMappers } from '../mappers/products.mapper';
import { ResultProductEntity } from '../dtos/product.entity';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SaleProductModel, ResponseSaleModel } from '../../../core/domain/sale-product.model';

const SUBCATEGORIES: SubCategoryModel[] = [
  {
    index: 0,
    clave: 'SAL',
    nombre: 'Salados',
    category: 'pastes',
    claveCategory: 'PAS'
  },
  {
    index: 1,
    clave: 'DUL',
    nombre: 'Dulces',
    category: 'pastes',
    claveCategory: 'PAS'
  },
  {
    index: 0,
    clave: 'CAL',
    nombre: 'Calientes',
    category: 'bebidas',
    claveCategory: 'BEB'
  },
  {
    index: 1,
    clave: 'FRI',
    nombre: 'Frias',
    category: 'bebidas',
    claveCategory: 'BEB'
  },
  {
    index: 2,
    clave: 'EMB',
    nombre: 'Embotellado',
    category: 'bebidas',
    claveCategory: 'BEB'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsSecondaryInterface {
  private mappers = new ProductsMappers();
  private cartStorage = new BehaviorSubject<number>(0);

  constructor(
  private http: HttpClient
  ) {
    super();
  }

  watchStorage(): Observable<any> {
    return this.cartStorage.asObservable();
  }

  getSubcategories(claveCategoria: string): Observable<SubCategoryModel[]> {
    const subCat = SUBCATEGORIES.filter(sub => sub.claveCategory === claveCategoria || sub.category === claveCategoria.toLowerCase());
    return of (subCat);
  }

  getIdPedido(): Observable<number | null> {
  const session = sessionStorage.getItem('idPedido')
    if (session) {
      return of (parseInt(session))
    }
    return of (null);
  }

  getProducts(claveCategoria:string | null, subCategoria: string | null, idVenta: number = 0): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getProductoByLinea/${idVenta}?categoria=${claveCategoria}&subCategoria=${subCategoria}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      distinctUntilChanged(),
      map( result => {
        sessionStorage.setItem('idPedido', `${idVenta}`);
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

  getImage(imgUrl:string): Observable<Blob> {
    const req = `${environment.apiUrl}/files/${imgUrl}`;
    return this.http.get(req, { responseType: 'blob'});
  }

}
