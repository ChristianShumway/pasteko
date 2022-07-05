import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSharedService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  idPedido: number = 0;

  constructor(
    private router: Router,
    private ppi: ProductSharedService
  ) { }

  ngOnInit(): void {
    this.getIdPedido();
    setTimeout(() => {
      this.finallyActions();
    }, 15000);
  }

  getIdPedido() {
    this.ppi.getIdPedido().subscribe({
      next: response => {
        if(response) this.idPedido = response;
      },
      error: error => console.warn(error)
    });
  }

  finallyActions() {
    this.ppi.deleteIdPedido();
    this.router.navigateByUrl('/home');
  }

}
