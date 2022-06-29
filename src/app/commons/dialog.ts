import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../shared/components/message-dialog/message-dialog.component';
import { TypeDialog } from './type-dialogs';
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

    closeDialog() {
      this.dialog.closeAll();
    }
}
