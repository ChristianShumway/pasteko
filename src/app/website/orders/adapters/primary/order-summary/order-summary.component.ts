import { CloseOrderEntity } from 'src/app/website/orders/adapters/secondary/dtos/order-detail.entity';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogMessage } from 'src/app/commons/dialog';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { ProductOrderModel } from '../../../core/domain/order-detail.model';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  idPedido: number = 0;
  productsOrder: any[] = [];
  formOptions!: FormGroup;
  amount: number = 0;
  regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  nameField: FormControl = new FormControl('', Validators.required);
  emailField: FormControl = new FormControl('', [Validators.email]);
  phoneField: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.regEx)]);
  nameFieldValid: boolean = false;
  emailFieldValid: boolean = true;
  phoneFieldValid: boolean = false;
  dataOrderValid: boolean = false;
  dataPurchase: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _ps: ProductSharedService,
    private ppi: ProductsPrimaryInterface,
    private usesase: SalePrimaryInterface,
    private location: Location,
    private router: Router,
    private dialog: DialogMessage,
  ) { }

  ngOnInit(): void {
    this.getidPedido();
    this.initForm();
    this.getCurrentSale()
    this.eventValuesInputs();
    this.getValidation();
    this.getStatusOrder();
  }

  initForm() {
    this.formOptions = this._formBuilder.group({
      aqui: true,
      llevar: false
    });
    this.comerAquiField?.valueChanges.subscribe( response => {
      if(response) {
        this.paraLlevarField?.setValue(false)
      }
    });
    this.paraLlevarField?.valueChanges.subscribe( response => {
      if(response) {
        this.comerAquiField?.setValue(false);
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
        this.productsOrder = response.detalle;
        this.getAmountTotal();
        // this.getTotalAcount();
        console.log(this.productsOrder);
      },
      error: error => console.warn(error)
    });
  }

  getAmountTotal() {
    this.amount = 0;
    let amountProduct = 0;
    this.productsOrder.forEach(product => {
      if(!product.detalle) {
        amountProduct = product.cantidad * product.viewProducto.precio;
        this.amount += amountProduct;
      } else {
        this.amount += product.precio;
        // product.detalle.forEach( (productoCombo: ProductOrderModel) => {
        //   amountProduct = productoCombo.cantidad * productoCombo.precio;
        //   this.amount += amountProduct;
        // });
      }
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
    this.phoneField.valueChanges.subscribe( () => {
      this.phoneFieldValid = this.phoneField.valid ? true : false;
      this.getValidation();
    });
  }

  getValidation() {
    this._ps.validateInputs(
      this.nameFieldValid,
      this.nameField.value,
      this.emailFieldValid,
      this.emailField.value,
      this.phoneFieldValid,
      this.phoneField.value).subscribe();
  }

  getStatusOrder() {
    this._ps.watchOrderReadyStorage().subscribe({
      next: response => this.dataOrderValid = response,
      error: error => console.warn(error)
    })
  }

  get comerAquiField() {
    return this.formOptions.get('aqui');
  }

  get paraLlevarField() {
    return this.formOptions.get('llevar');
  }

  saveOrder() {
    if(!this.paraLlevarField?.value && !this.comerAquiField?.value) {
      this.dialog.showDialogError('¡Selecciona si es para comer aquí o para llevar.!');
    } else {
      console.log('termina compra');
      this.finishOrder();
    }
  }

  finishOrder() {
    const dialogRef = this.dialog.showDialogConfirm('¿Deseas confirmar tu pedido?');
    dialogRef.afterClosed().subscribe(
      result => {
        if(result) {
          // this.getIdPedido();
          this._ps.purchase$.subscribe({
            next: response => {
              this.dataPurchase = response;
              const dataCustomer: CloseOrderEntity = {
                idVenta: this.idPedido,
                correo: this.dataPurchase.mail,
                telefono: this.dataPurchase.phone,
                nombre: this.dataPurchase.name
              };
              this._ps.closeOrder(dataCustomer).subscribe({
                next: resp => {
                  console.log(resp);
                  if(resp.noEstatus === 5) {
                    this.router.navigateByUrl('/compra');
                  } else if (resp.noEstatus === 0) {
                    this.dialog.showDialogError(resp.mensaje);
                  }
                },
                error: error => console.warn(error)
              })
            },
            error: error => console.warn(error)
          })
        }
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  getContenido(contenidoCombo: ProductOrderModel[]) {
    let productText = ''
    contenidoCombo.forEach( (product, i) => {
      productText += ` ${product.viewProducto.descripcion.toLowerCase()}, `;
      productText = contenidoCombo.length === i+1 ? productText.substring(0, productText.length - 2) : productText;
    });
    return productText;
  }

}
