import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { Router } from '@angular/router';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { DialogMessage } from 'src/app/commons/dialog';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { forkJoin } from 'rxjs';
import { CloseOrderEntity } from 'src/app/website/orders/adapters/secondary/dtos/order-detail.entity';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  idPedido: number = 0;
  total: number = 0;
  totalSession: string | null = null;
  dataOrderValid: boolean = false;
  dataPurchase: any;

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
    this.getStatusOrder();
    this.getIdPedido();
  }

  getCurrent() {
    this._ps.watchStorage()
    .subscribe({
      next: response => {
        this.total = response
      },
      error: error => console.warn(error)
    });
  }

  getStatusOrder() {
    this._ps.watchOrderReadyStorage().subscribe({
      next: response => this.dataOrderValid = response,
      error: error => console.warn(error)
    })
  }

  goBack(): void {
    this.location.back();
  }

  getIdPedido() {
    this._ps.getIdPedido().subscribe({
      next: response => {
        if(response) this.idPedido = response;
      },
      error: error => console.warn(error)
    });
  }

  deleteSale() {
    const dialogRef = this.dialog.showDialogConfirm('¿Estás seguro de eliminar tu pedido?');
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.getIdPedido();
          this.usecase.deleteSale(this.idPedido).subscribe({
            next: rsp => {
              if(rsp.noEstatus === 5) {
                this.ppi.deleteIdPedido();
                this.router.navigateByUrl('/');
                this.dialog.showDialogSuccess('Pedido eliminado correctamente');
              } else {
                this.dialog.showDialogError('¡Algo salio mal!, consulte a su administrador');
              }
            },
            error: error => console.warn(error)
          });
        }
      }
    );
  }
  continueSale() {
    this.router.navigateByUrl('/pedido');
  }

  saveOrder() {
    const dialogRef = this.dialog.showDialogConfirm('¿Deseas confirmar tu pedido?');
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          this.getIdPedido();
          this._ps.purchase$.subscribe({
            next: response => {
              this.dataPurchase = response;
              const dataCustomer: CloseOrderEntity = {
                idVenta: this.idPedido,
                correo: this.dataPurchase.mail,
                telefono: this.dataPurchase.phone,
                nombre: this.dataPurchase.name
              };
              this._ps.closeOrder(dataCustomer).subscribe({
                next: resp => {
                  console.log(resp);
                  if(resp.noEstatus === 5) {
                    this.router.navigateByUrl('/compra');
                  } else if (resp.noEstatus === 0) {
                    this.dialog.showDialogError(resp.mensaje);
                  }
                },
                error: error => console.warn(error)
              })
            },
            error: error => console.warn(error)
          })
          console.log(this.dataPurchase);
        }
      }
    )
  }

  ngOnDestroy(): void {
    window.location.reload();
  }

}
