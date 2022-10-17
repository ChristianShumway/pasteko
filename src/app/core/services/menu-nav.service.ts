import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OptionMenuEntity, ResponseOptionMenuEntity } from 'src/app/website/home/adapters/secondary/dtos/menu-options.entity';
import { MenuOptionsMappers } from 'src/app/website/home/adapters/secondary/mappers/menu-options.mapper';
import { OptionMenuModel } from 'src/app/website/home/core/domain/menu-options.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class MenuNavService {

  private mappers = new MenuOptionsMappers();

  constructor(
    private http: HttpClient
  ) {}


  getOptionsMenu(): Observable<OptionMenuModel[]> {
    return this.http.get<ResponseOptionMenuEntity>(`${environment.apiUrl}dashboard/getMenu`)
    .pipe(
      map(data => this.mappers.mapFromMenuOptions(data.response)),
    );
  }

}
