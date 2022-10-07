import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { SaleProductModel } from 'src/app/website/products/core/domain/sale-product.model';
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
  amount: number = 0;
  formMetodos!: FormGroup;

  constructor(
    private usesase: SalePrimaryInterface,
    private ppi: ProductsPrimaryInterface,
    private _ps: ProductSharedService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getidPedido();
    this.getCurrentSale();
    this.initForm();
  }

  initForm() {
    this.formMetodos = this._formBuilder.group({
      efectivo: true,
      tarjeta: false
    });
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
        this.getAmountTotal();
        this.getTotalAcount();
        // console.log(this.productsOrder);
      },
      error: error => console.warn(error)
    });
  }

  getTotalAcount() {
    return this._ps.getTotalProducts(this.idPedido).subscribe();
  }

  onGetProductSelected(product: ProductOrderModel) {
    console.log(product);
    const productToSave: SaleProductModel = {
      idSalida: product.idSalida,
      idVenta: this.idPedido,
      codigo: product.codigo,
      cantidad: product.cantidad,
      viewProducto: {
        cantidadPedida: product.cantidad,
        codigo: product.codigo,
        descripcion: product.viewProducto?.descripcion,
        existencia: product.viewProducto?.existencia,
        idSalida: product.idSalida,
        imagen: product?.viewProducto?.imagen,
        linea: product.codigo,
        precio: product.precio
      },
    };

    this.ppi.productSale(productToSave).subscribe({
      next: response => {
        console.log(response);
        this.idPedido = response?.pk;
        this.getCurrentSale();
      },
      error: error => console.warn(error)
    });
  }

  getAmountTotal() {
    this.amount = 0;
    this.productsOrder.forEach(product => {
      const amountProduct = product.cantidad * product.precio;
      this.amount += amountProduct;
    });
  }

  goOrderSummary() {
    this._router.navigateByUrl('pedido/resumen');
  }

  goBack(): void {
    this.location.back();
  }

}
