import { Component, OnInit } from '@angular/core';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { ProductOrderModel } from '../../../core/domain/order-detail.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  idPedido: number = 0;
  title: string = 'Pedido';
  productsOrder: ProductOrderModel[] = [];

  constructor(
    private usesase: SalePrimaryInterface,
    private ppi: ProductsPrimaryInterface
  ) { }

  ngOnInit(): void {
    this.getidPedido();
    this.getCurrentSale();
  }

  getidPedido() {
    this.ppi.getIdPedido().subscribe({
      next: response => {
        if(response) this.idPedido = response;
      },
      error: error => console.warn(error)
    });
  }

  getCurrentSale() {
    this.usesase.getCurrentSale(this.idPedido).subscribe({
      next: response => {
        this.productsOrder = response.detalle;
        console.log(this.productsOrder);
      },
      error: error => console.warn(error)
    });
  }

  onGetProductSelected(product: ProductOrderModel) {
    console.log(product);
  }

}
