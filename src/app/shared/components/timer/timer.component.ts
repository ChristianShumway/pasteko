import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogMessage } from 'src/app/commons/dialog';
import { TimerService } from 'src/app/core/services/timer.service';
import { ProductsService } from 'src/app/website/products/adapters/secondary/apirest/products.service';
import { SaleService } from 'src/app/website/orders/adapters/secondary/apirest/sale.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  timer: number = 0;
  timeLimit: number = 300;
  timeAdd: number = 30;
  idPedido: number = 0;

  constructor(
    private _ts: TimerService,
    private _ps: ProductsService,
    private _os: SaleService,
    private dialog: DialogMessage,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getTime();
  }

  getIdPedido() {
    this._ps.getIdPedido().subscribe({
      next: response => {
        if(response) {
          this.idPedido = response;
        }
      }
    });
  }

  getTime() {
    this._ts.getTime(this.timeLimit);
    this._ts.watchTimer().subscribe( time => {
      this.timer = time;
      this.showAlerts();
      // console.log(this.timer)
    })
  }

  showAlerts() {
    // if(this.timer === 0) {
    //   this.dialog.showDialogWarn('Tienes 5 minutos para realizar tu pedido');
    //   this.closeDialog();
    // }
    if(this.timer === this.timeLimit - 10) {
      this.confirmAddTime();
    }
    if(this.timer === this.timeLimit) {
      this.deleteOrder();
    }
  }

  confirmAddTime(){
    const dialogRef = this.dialog.showDialogConfirm('¿Requieres de más tiempo para tu pedido?');
    dialogRef.afterClosed().subscribe(
      response => {
        if(response) {
          this._ts.addTime(this.timeAdd);
        }
      }
    );
    this.closeDialog();
  }

  deleteOrder() {
    this.getIdPedido();
    if(this.idPedido !== 0) {
      this._os.deleteSale(this.idPedido).subscribe({
        next: rsp => {
          if(rsp.noEstatus === 5) {
            this._ps.deleteIdPedido();
            this.dialog.showDialogWarn('Tu tiempo se termino, lo sentimos');
            this.router.navigateByUrl('/');
          } else {
            this.dialog.showDialogError('¡Algo salio mal!, consulte a su administrador');
          }
        },
        error: error => console.warn(error)
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  closeDialog() {
    setTimeout(() => {
      this.dialog.closeDialog();
    }, 8000);
  }

  ngOnDestroy(): void {
    this._ts.resetTime();
    window.location.reload();
  }

}
