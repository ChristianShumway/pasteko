import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './../../core/services/loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showText = 'Cargando';
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService){
  }
}
