import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionMenuModel } from '../../../core/domain/menu-options.model';
import { MenuOptionsPrimaryInterface } from '../../../core/ports/primary/menu-options.primary.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  optionsMenu: OptionMenuModel[] = [];
  title: string = '';
  constructor(
    private useCase: MenuOptionsPrimaryInterface,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getOptionsMenu();
  }

  getOptionsMenu() {
    this.useCase.getOptionsMenu().subscribe(
      response => {
        this.optionsMenu = response;
        console.log(this.optionsMenu)
      },
      error => console.log(error)
    );
  }

  goToProducts(option: OptionMenuModel) {
    this.route.navigateByUrl(`/productos/${option.idLinea}`)
  }

}
