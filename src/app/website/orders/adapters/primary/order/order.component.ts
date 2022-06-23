import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  nameField: FormControl = new FormControl('', Validators.required);
  emailField: FormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFieldValid: boolean = false;
  emailFieldValid: boolean = false;

  constructor(
    private usesase: SalePrimaryInterface,
    private ppi: ProductsPrimaryInterface,
    private _ps: ProductSharedService
  ) { }

  ngOnInit(): void {
    this.getidPedido();
    this.getCurrentSale();
    this.getValidation();
    this.eventValuesInputs();
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

  eventValuesInputs() {
    this.nameField.valueChanges.subscribe( () => {
      this.nameFieldValid = this.nameField.valid ? true : false;
      this.getValidation();
    });
    this.emailField.valueChanges.subscribe( () => {
      this.emailFieldValid = this.emailField.valid ? true : false;
      this.getValidation();
    });
  }

  getValidation() {
    this._ps.validateInputs(this.nameFieldValid, this.emailFieldValid).subscribe();
  }


}
