import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

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

}
