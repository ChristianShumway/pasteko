import { Component, Input, OnInit } from '@angular/core';
import { OptionMenuModel } from '../../../core/domain/menu-options.model';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.scss']
})
export class OptionMenuComponent implements OnInit {
  @Input() item: OptionMenuModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
