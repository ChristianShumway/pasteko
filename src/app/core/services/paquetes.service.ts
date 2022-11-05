import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultProductEntity } from 'src/app/website/products/adapters/secondary/dtos/product.entity';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(
    private http: HttpClient
  ) { }

  getCombos(idCombo: number, idPedido: number, categoria: string | undefined, subcategoria: string | undefined): Observable<ProductModel[]> {
    const req = `${environment.apiUrl}/dashboard/getArticuloPermitidosEnCombo/${idCombo}/${idPedido}?categoria=${categoria}&subCategoria=${subcategoria}`;
    return this.http.get<ResultProductEntity>(req).pipe(
      map( result => {
        // sessionStorage.setItem('idPedido', `${idVenta}`);
        return result?.response;
      })
    );
  }

}


// dashboard/getArticuloPermitidosEnCombo/53/1?categoria=PAS&subCategoria=SAL
