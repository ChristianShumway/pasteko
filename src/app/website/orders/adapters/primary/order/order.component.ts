import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DialogMessage } from 'src/app/commons/dialog';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';

import { ProductSharedService } from 'src/app/core/services/products.service';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';

import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { SaleProductModel } from 'src/app/website/products/core/domain/sale-product.model';
import { ComboOrderModel, ProductOrderModel } from '../../../core/domain/order-detail.model';
import { ProductoRecomendacionModel } from './../../../core/domain/producto-recomendacion.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  idPedido: number = 0;
  title: string = 'Pedido';
  productsOrder: any[] = [];
  combosOrder: ComboOrderModel[] = [];
  amount: number = 0;
  formMetodos!: FormGroup;
  recomendacionesList: ProductoRecomendacionModel[] = [];

  constructor(
    private usesase: SalePrimaryInterface,
    private ppi: ProductsPrimaryInterface,
    private _ps: ProductSharedService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private location: Location,
    private dialog: DialogMessage,
  ) { }

  ngOnInit(): void {
    this.getidPedido();
    this.getCurrentSale();
    this.getRecomendaciones();
    this.initForm();
  }

  initForm() {
    this.formMetodos = this._formBuilder.group({
      efectivo: true,
      tarjeta: false
    });
    this.efectivoField?.valueChanges.subscribe( response => {
      if(response) {
        this.tarjetaField?.setValue(false)
      }
    });
    this.tarjetaField?.valueChanges.subscribe( response => {
      if(response) {
        this.efectivoField?.setValue(false);
      }
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
        console.log(response)
        // response.detalle.forEach( data => {
        //   if (data?.detalle){}
        // })
        this.productsOrder = response.detalle;
        console.log(this.productsOrder);
        this.getAmountTotal();
        this.getTotalAcount();
      },
      error: error => console.warn(error)
    });
  }

  getRecomendaciones() {
    this.usesase.getRecomendaciones(this.idPedido).subscribe({
      next:  response => this.recomendacionesList = response,
      error: error => console.warn(error)
    });
  }

  getTotalAcount() {
    return this._ps.getTotalProducts(this.idPedido).subscribe();
  }

  onGetProductSelected(product: ProductOrderModel) {
    const productToSave: SaleProductModel = {
      idSalida: product.idSalida,
      idVenta: this.idPedido,
      codigo: product.codigo,
      cantidad: product.cantidad,
      idCombo: product.idCombo,
      viewProducto: {
        cantidadPedida: product.cantidad,
        codigo: product.codigo,
        descripcion: product.viewProducto?.descripcion,
        existencia: product.viewProducto?.existencia,
        idSalida: product.idSalida,
        imagen: product?.viewProducto?.imagen,
        informacion: product?.viewProducto?.informacion,
        linea: product.codigo,
        precio: product.precio,
        idCombo: product.idCombo
      },
    };

    this.ppi.productSale(productToSave).subscribe({
      next: response => {
        this.idPedido = response?.pk;
        this.getCurrentSale();
        this.getRecomendaciones();
      },
      error: error => console.warn(error)
    });
  }

  getAmountTotal() {
    this.amount = 0;
    let amountProduct = 0;
    this.productsOrder.forEach(product => {
      if(!product.detalle) {
        amountProduct = product.cantidad * product.precio;
        this.amount += amountProduct;
      } else {
        product.detalle.forEach( (productoCombo: ProductOrderModel) => {
          amountProduct = productoCombo.cantidad * productoCombo.precio;
          this.amount += amountProduct;
        })
      }
    });
  }

  get efectivoField() {
    return this.formMetodos.get('efectivo');
  }

  get tarjetaField() {
    return this.formMetodos.get('tarjeta');
  }

  goOrderSummary() {
    if(!this.efectivoField?.value && !this.tarjetaField?.value) {
      this.dialog.showDialogError('¡Selecciona primero tu método de pago.!');
    } else {
      if(this.efectivoField?.value) {
        sessionStorage.setItem('metodo-pago', 'efectivo');
      } else {
        sessionStorage.setItem('metodo-pago', 'tarjeta');
      }
      this._router.navigateByUrl('pedido/resumen');
    }
  }

  onAddProductSelected(producto: ProductModel) {
    producto.cantidadPedida = 1;
    const productToOrder: ProductOrderModel = {
      cantidad: producto.cantidadPedida,
      codigo: producto.codigo,
      costo: producto.precio,
      descuento: 0,
      idVenta: this.idPedido,
      idSalida: producto.idSalida,
      impuesto: 0,
      precio: producto.precio,
      idCombo: producto.idCombo,
      viewProducto: producto
    };
    this.onGetProductSelected(productToOrder);
  }

  onDeleteProductSelected(product: any) {
    const dialogRef = this.dialog.showDialogConfirm('¿Estás seguro de eliminar el producto de tu orden?');
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          console.log(product)
          if(!product.detalle) {
            this.usesase.deleteProductOrder(this.idPedido, product.idSalida).subscribe({
              next: () => this.getCurrentSale(),
              error: error => console.warn(error)
            });
          } else {
            this.usesase.deleteProductOrder(this.idPedido, product.detalle[0].idSalida).subscribe({
              next: () => this.getCurrentSale(),
              error: error => console.warn(error)
            });
            // product.detalle.forEach((prod:ProductModel, i: number) => {
            //   this.usesase.deleteProductOrder(this.idPedido, prod.idSalida).subscribe({
            //     next: () => {
            //       if(product.detalle.lenngth === i+1) {
            //         this.getCurrentSale();
            //       }
            //     },
            //     error: error => console.warn(error)
            //   });
            // });
          }
        }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
