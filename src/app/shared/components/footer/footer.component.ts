import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { Router } from '@angular/router';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { ProductsService } from 'src/app/website/products/adapters/secondary/apirest/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  idPedido: number = 0;
  total: number = 0;

  constructor(
    private location: Location,
    private usecase: SalePrimaryInterface,
    private router: Router,
    private ppi: ProductsPrimaryInterface,
    private ps: ProductsService
  ) { }

  ngOnInit(): void {
    this.ps.cart$.subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.warn(error)
    })
  }

  goBack(): void {
    this.location.back();
  }


  deleteSale() {
    this.ppi.getIdPedido().subscribe({
      next: response => {
        if(response) this.idPedido = response;
        console.log(this.idPedido);
        this.usecase.deleteSale(this.idPedido).subscribe({
          next: response => {
            if(response.noEstatus === 5) {
              this.ppi.deleteIdPedido();
              this.router.navigateByUrl('/');
            }
          },
          error: error => console.warn(error)
        });
      }
    });
  }

}
