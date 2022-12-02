import { CloseOrderEntity } from 'src/app/website/orders/adapters/secondary/dtos/order-detail.entity';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogMessage } from 'src/app/commons/dialog';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { ProductsPrimaryInterface } from 'src/app/website/products/core/ports/primary/products.primary.interface';
import { SalePrimaryInterface } from 'src/app/website/orders/core/ports/primary/sale.primary.interface';
import { ProductOrderModel } from '../../../core/domain/order-detail.model';
import Keyboard from "simple-keyboard";
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  keyboard!: Keyboard;
  keyFocus: string = "";
  keyboardActive: boolean = false;
  inputName = "nameField";
  inputs: any = {
    nameField: this.nameField.value,
    phoneField: this.phoneField.value
  };

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

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      debug: true,
      inputName: this.inputName,
      onChange: (input) => this.onChange(input),
      onKeyPress: (button: any) => this.onKeyPress(button),
      preventMouseDownDefault: false // If you want to keep focus on input
    });

    /**
     * Since we have default values for our inputs,
     * we must sync them with simple-keyboard
     */
    this.keyboard.replaceInput(this.inputs);
  }

  onInputFocus = (event: any) => {
    this.inputName = event.target.id;
    this.keyboardActive = this.inputName === 'nameField' || this.inputName === 'phoneField' ? true : false;
    // this.handleShift()
    // console.log('mostrar teclado', this.keyboardActive);
    console.log("Focused input", this.inputName);

    this.keyboard.setOptions({
      inputName: event.target.id
    });
  };

  setInputCaretPosition = (elem: any, pos: number) => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value, event.target.id);
  };

  onChange = (input: string) => {
    if(this.inputName === 'nameField') {
      this.nameField.setValue(input)
    } else  if(this.inputName === 'phoneField') {
      this.phoneField.setValue(input)
    }
    // this.inputs[this.inputName] = input;
    // console.log("Input changed", input);

    /**
     * Synchronizing input caret position
     * This part is optional and only relevant if using the option "preventMouseDownDefault: true"
     */
    let caretPosition = this.keyboard.caretPosition;

    if (caretPosition !== null)
      this.setInputCaretPosition(
        document.querySelector(`#${this.inputName}`),
        caretPosition
      );

    // console.log("caretPosition", caretPosition);
  };

  onKeyPress = (button: string) => {
    // console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    if(button === '{enter}') this.keyboardActive = false;
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

}
