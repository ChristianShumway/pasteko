import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { Router } from '@angular/router';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { DialogMessage } from 'src/app/commons/dialog';
import { ProductSharedService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  idPedido: number = 0;
  total: number = 0;
  totalSession: string | null = null;

  constructor(
    private location: Location,
    private usecase: SalePrimaryInterface,
    private router: Router,
    private ppi: ProductsPrimaryInterface,
    private dialog: DialogMessage,
    private _ps: ProductSharedService
  ) {}

  ngOnInit(): void {
    this.getCurrent();
  }

  getCurrent() {
    this._ps.watchStorage().subscribe({
      next: response => this.total = response,
      error: error => console.warn(error)
    })
  }

  goBack(): void {
    this.location.back();
  }

  deleteSale() {
    const dialogRef = this.dialog.showDialogConfirm('¿Estás seguro de eliminar tu pedido?');
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.ppi.getIdPedido().subscribe({
            next: response => {
              if(response) this.idPedido = response;
              console.log(this.idPedido);
              this.usecase.deleteSale(this.idPedido).subscribe({
                next: rsp => {
                  if(rsp.noEstatus === 5) {
                    this.ppi.deleteIdPedido();
                    this.router.navigateByUrl('/');
                    this.dialog.showDialogSuccess('Pedido eliminado');
                  } else {
                    this.dialog.showDialogError('¡Algo salio mal!, consulte a su administrador');
                  }
                },
                error: error => console.warn(error)
              });
            }
          });
        }
      }
    );
  }

}
