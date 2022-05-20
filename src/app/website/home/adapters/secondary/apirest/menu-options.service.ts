import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { MenuOptionsSecondaryInterface } from '../../../core/ports/secondary/menu-options.secondary.interface';
import { OptionMenuModel } from '../../../core/domain/menu-options.model';
import { OptionMenuEntity, ResponseOptionMenuEntity } from '../dtos/menu-options.entity';
import { MenuOptionsMappers } from '../mappers/menu-options.mapper';
import { environment } from './../../../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MenuOptionsService extends MenuOptionsSecondaryInterface {

  private mappers = new MenuOptionsMappers();
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getOptionsMenu(): Observable<OptionMenuModel[]> {
    return this.http.get<ResponseOptionMenuEntity>(`${environment.apiUrl}dashboard/getMenu`)
    .pipe( map(data => this.mappers.mapFromMenuOptions(data.response)))
    // return of (DUMMY_OPTIONS).pipe(
    //   map( data => this.mappers.mapFromMenuOptions(data))
    // );
  }

}


// http://74.208.16.29:8080/pasteco-web/dashboard//getProductoByLinea/01
