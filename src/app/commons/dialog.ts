import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../shared/components/message-dialog/message-dialog.component';
import { TypeDialog } from './type-dialogs';
import { InfoProductComponent } from '../shared/components/info-product/info-product.component';
import { ProductModel } from '../website/products/core/domain/product.model';
import { ModalPaqueteComponent } from '../shared/components/modal-paquete/modal-paquete.component';
@Injectable()
export class DialogMessage {

    constructor(public dialog: MatDialog) { }

    showDialog<T, Type>(component: ComponentType<T>, width: string, height: string, data: Type) {
        this.dialog.open(component, {
            width: width, height: height,
            data,
            autoFocus: false
        });
    }

    showDialogWithConfig<T>(component: ComponentType<T>, config: MatDialogConfig): MatDialogRef<T>  {
        return this.dialog.open(component, config);
    }

    showDialogError(mensaje: string) {
        let dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.data = { header : mensaje, type: TypeDialog.ERROR, confirm: false};
        dialogConfig.autoFocus = false;
        dialogConfig.role = 'alertdialog';
        dialogConfig.width = 'auto';
        this.dialog.open(MessageDialogComponent, dialogConfig);
    }

    showDialogWarn(mensaje: string) {
      let dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.data = { header : mensaje, type:TypeDialog.WARN, confirm: false};
      dialogConfig.autoFocus = false;
      dialogConfig.role = 'alertdialog';
      dialogConfig.width = 'auto';
      this.dialog.open(MessageDialogComponent, dialogConfig);
  }

    showDialogSuccess(mensaje: string) {
        let dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.data = { header : mensaje, type:TypeDialog.SUCCESS, confirm: false };
        dialogConfig.autoFocus = false;
        dialogConfig.role = 'alertdialog';
        dialogConfig.width = 'auto';
        this.dialog.open(MessageDialogComponent, dialogConfig);
    }

    showDialogConfirm(mensaje: string) {
      let dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.data = { header : mensaje, type: TypeDialog.CONFIRM, confirm: true };
      dialogConfig.autoFocus = false;
      dialogConfig.role = 'alertdialog';
      dialogConfig.width = 'auto';
      return this.dialog.open(MessageDialogComponent, dialogConfig);
    }

    showInfoProduct(product: ProductModel, type: string) {
      let dialog: MatDialogConfig = new MatDialogConfig();
      dialog.data = { product, type };
      dialog.autoFocus = false;
      dialog.role = 'alertdialog';
      dialog.width = '40%';
      return this.dialog.open(InfoProductComponent, dialog)
    }

    showModalPaquete(codigoPaquete: string, steppers: any[], idPedido: number, noComboAgregado: number) {
      let dialog: MatDialogConfig = new MatDialogConfig();
      dialog.data = {codigoPaquete, steppers, idPedido, noComboAgregado};
      dialog.autoFocus = false;
      dialog.role = 'alertdialog';
      dialog.width = '80%';
      return this.dialog.open(ModalPaqueteComponent, dialog)
    }

    closeDialog() {
      this.dialog.closeAll();
    }
}
