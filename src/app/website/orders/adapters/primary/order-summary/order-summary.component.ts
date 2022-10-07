import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { ProductOrderModel } from '../../../core/domain/order-detail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  idPedido: number = 0;
  productsOrder: ProductOrderModel[] = [];
  formOptions!: FormGroup;
  amount: number = 0;
  regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  nameField: FormControl = new FormControl('', Validators.required);
  emailField: FormControl = new FormControl('', [Validators.email]);
  phoneField: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.regEx)]);
  nameFieldValid: boolean = false;
  emailFieldValid: boolean = true;
  phoneFieldValid: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _ps: ProductSharedService,
    private ppi: ProductsPrimaryInterface,
    private usesase: SalePrimaryInterface,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getidPedido();
    this.initForm();
    this.getCurrentSale()
    this.eventValuesInputs();
    this.getValidation();
  }

  initForm() {
    this.formOptions = this._formBuilder.group({
      aqui: true,
      llevar: false
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
    this.phoneField.valueChanges.subscribe( () => {
      console.log(this.phoneField.valid)
      console.log(this.phoneField.value)

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

  saveOrder() {
    this.router.navigateByUrl('/compra');
  }

  goBack(): void {
    this.location.back();
  }

}
