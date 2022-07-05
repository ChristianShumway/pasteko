import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TypeDialog } from 'src/app/commons/type-dialogs';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  getTypeInfo(): any {
    if(this.data?.type === TypeDialog.WARN) {
      return 'report';
    }
    if(this.data?.type === TypeDialog.ERROR) {
      return 'cancel';
    }
    if(this.data?.type === TypeDialog.SUCCESS) {
      return 'check_circle';
    }
    if(this.data?.type === TypeDialog.CONFIRM) {
      return 'help';
    }
  }

}
