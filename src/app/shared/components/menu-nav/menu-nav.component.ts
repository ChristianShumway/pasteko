import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuNavService } from 'src/app/core/services/menu-nav.service';
import { OptionMenuModel } from './../../../website/home/core/domain/menu-options.model';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {
  options: OptionMenuModel[] = [];
  optionActived: string | null = null;

  constructor(
    private navService: MenuNavService,
  ) { }

  ngOnInit(): void {
    this.getOptionsMenu();
  }


  getOptionsMenu() {
    this.navService.getOptionsMenu().subscribe(
      response => {
        // console.log(response);
        this.options = response;
      },
      error => console.error(error)
    );
  }


}
