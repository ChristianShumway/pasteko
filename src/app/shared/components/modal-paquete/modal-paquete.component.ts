import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StepPaqueteModel } from './../../../website/products/core/domain/paquete.model';
import { PaquetesService } from './../../../core/services/paquetes.service';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { DialogMessage } from 'src/app/commons/dialog';

@Component({
  selector: 'app-modal-paquete',
  templateUrl: './modal-paquete.component.html',
  styleUrls: ['./modal-paquete.component.scss'],
})
export class ModalPaqueteComponent implements OnInit {

  codigoPaquete: string = '';
  stepperList: StepPaqueteModel[] = [];
  renderingStep!: StepPaqueteModel;
  idPedido: number = 0;
  productsCombo: ProductModel[] = [];
  canSelected: boolean = true;
  productsToSession: ProductModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paquesteService: PaquetesService,
    private cdRef:ChangeDetectorRef,
    private dialog: DialogMessage,
    private matdialog: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.codigoPaquete = this.data.codigoPaquete;
    this.stepperList = this.data.steppers;
    this.idPedido = this.data.idPedido;
    this.renderingStep = this.stepperList[0];
    console.log(this.stepperList);
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  getType(clave: string, cantidad: number) {
    if(clave === 'BEB') {
      return cantidad === 1 ? 'Bebida' : 'Bebidas';
    } else if(clave === 'PAS') {
      return cantidad === 1 ? 'Paste' : 'Pastes';
    } return
  }

  getProducts(index: number = 0) {
    // console.log(index);
    this.canSelected = this.renderingStep.cantidad === this.renderingStep.cantidadSeleccionada ? false : true;
    const subCatSelected = this.renderingStep.sub.find(sub => sub.index === index);
    // console.log(subCatSelected);
    this.paquesteService.getCombos(parseInt(this.codigoPaquete), this.idPedido, subCatSelected?.claveCategory, subCatSelected?.clave)
    .subscribe({
      next: response => {
        this.productsCombo = response;
        this.getProductsSessionStorage();
        console.log(response);
      },
      error: error => console.warn(error)
    });
  }

  getProductsSessionStorage() {
    const session = sessionStorage.getItem('product-list');
    console.log(this.productsToSession);
  }

  onGetProductSelected(product: ProductModel) {
    console.log(product)
    // const session = sessionStorage.getItem('product-list');
    const indexProdExist = this.productsToSession.findIndex(prod => prod.codigo === product.codigo);
    const buscandoProducto = this.productsToSession.find(prod => prod.codigo === product.codigo);
    console.log(indexProdExist);
    if(indexProdExist >= 0) {
      if(product.cantidadPedida === 0) {
        console.log('va a eliminar de la lista')
        this.productsToSession.splice(indexProdExist, 1)
      } else {
        this.productsToSession[indexProdExist] = product;
      }
    } else {
      this.productsToSession.push(product);
      // const stringList = JSON.stringify(this.productsToSession)
      // sessionStorage.setItem('product-list', stringList);
    }
    console.log('lista de producto guardada modificada', this.productsToSession);
  }

  onChangeCountTotal(accion: string) {
    this.renderingStep.cantidadSeleccionada = accion === 'add' ?  this.renderingStep.cantidadSeleccionada + 1 :  this.renderingStep.cantidadSeleccionada - 1;
    this.canSelected = this.renderingStep.cantidad === this.renderingStep.cantidadSeleccionada ? false : true;
    console.log(this.stepperList);
  }

  changeStep(index: number) {
    this.renderingStep = this.stepperList[index];
    console.log(this.renderingStep);
    if(this.renderingStep) {
      this.getProducts();
      // this.canSelected = true;
    }
  }

  cancelCombo() {
    const dialogRef = this.dialog.showDialogConfirm('¿Estás seguro de cancelar tu paquete?');
    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.matdialog.close();
      }
    })
  }

}
