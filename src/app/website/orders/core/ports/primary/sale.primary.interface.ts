import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOrderDetailtModel } from '../../domain/order-detail.model';

@Injectable({
  providedIn: 'root',
})
export abstract class SalePrimaryInterface {

  /**
   * @params id del pedido
  * @returns mensaje conformación
  */
  abstract deleteSale(idPedido: number): Observable<any>

  /**
  * @params id del pedido
  * @returns datos del pedido
  */
    abstract getCurrentSale(idPedido: number): Observable<ResponseOrderDetailtModel>

}
