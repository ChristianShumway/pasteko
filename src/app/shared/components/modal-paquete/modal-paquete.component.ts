import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StepPaqueteModel } from './../../../website/products/core/domain/paquete.model';
import { PaquetesService } from './../../../core/services/paquetes.service';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { DialogMessage } from 'src/app/commons/dialog';
import { SaleProductModel } from 'src/app/website/products/core/domain/sale-product.model';

declare var configuraciones: any;
let estacion = configuraciones.estacion;
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
  productsToSession: SaleProductModel[] = [];
  notFoundResults: boolean = false;
  noComboTrabajando!: number;
  indexTab: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paquesteService: PaquetesService,
    private cdRef:ChangeDetectorRef,
    private dialog: DialogMessage,
    private matdialog: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.codigoPaquete = this.data?.codigoPaquete;
    this.stepperList = this.data?.steppers;
    this.idPedido = this.data?.idPedido;
    this.noComboTrabajando = this.data?.noComboAgregado;
    this.renderingStep = this.stepperList[0];
    console.log(this.stepperList);
    this.getProductsCombo(this.indexTab);
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  getProductsCombo(index: number) {
    console.log('index actual', index);
    this.indexTab = index;
    console.log('index tab', index);
    this.notFoundResults = false;
    this.canSelected = this.renderingStep.cantidad === this.renderingStep.cantidadSeleccionada ? false : true;
    const subCatSelected = this.renderingStep.sub.find(sub => sub.index === index);
    this.paquesteService.getProductsCombo(parseInt(this.codigoPaquete), this.idPedido, subCatSelected?.claveCategory, subCatSelected?.clave)
    .subscribe({
      next: response => {
        this.productsCombo = response;
        this.editValuesProductsToCombo();
        console.log(response);
        this.notFoundResults = response.length === 0 ? true : false;
      },
      error: error => console.warn(error)
    });
  }

  editValuesProductsToCombo() {
    console.log(this.productsToSession);
    this.productsCombo.forEach( producto => {
      let buscandoProducto = this.productsToSession.find(prod => prod.codigo === producto.codigo);
      console.log(buscandoProducto);
      producto.cantidadPedida = buscandoProducto ? buscandoProducto.cantidad : 0;
      if(buscandoProducto) {
        buscandoProducto.idSalida = producto.idSalida;
      }
    });
  }

  onGetProductSelected(product: ProductModel) {
    console.log(product)

    const indexProdExist = this.productsToSession.findIndex(prod => prod.codigo === product.codigo);
    const productToSave: SaleProductModel = {
      idSalida: product.idSalida,
      idVenta: this.idPedido,
      codigo: product.codigo,
      idCombo: product.idCombo,
      viewProducto: product,
      cantidad: product.cantidadPedida,
      noCombo: this.noComboTrabajando,
      caja: estacion,
      estacion: estacion
    };

    this.paquesteService.productSale(productToSave).subscribe({
      next: response => {
        console.log(response);
        console.log(this.productsCombo)
        this.idPedido = response?.pk;
        this.carritoTemporal(indexProdExist, productToSave);
        // this.getProductsCombo(this.indexTab);
        sessionStorage.setItem('idPedido', `${this.idPedido}`);
        const indexProd = this.productsCombo.findIndex( producto => producto.codigo === response.response.codigo);
        console.log(indexProd);
        this.productsCombo[indexProd].cantidadCombo = response.response.cantidadCombo;
        this.productsCombo[indexProd].cantidadPedida = response.response.cantidadPedida;
        this.productsCombo[indexProd].existencia = response.response.existencia;
        this.productsCombo[indexProd].idSalida = response.response.idSalida;
        this.productsCombo[indexProd].disponible = response.response.disponible;
        this.editValuesProductsToCombo();
        // console.log(response);
        // this.notFoundResults = response.length === 0 ? true : false;
      },
      error: error => console.warn(error)
    });

  }

  carritoTemporal(indexProdExist: number, product: SaleProductModel) {
    if(indexProdExist >= 0) {
      if(product.cantidad === 0) {
        this.productsToSession.splice(indexProdExist, 1)
      } else {
        this.productsToSession[indexProdExist] = product;
      }
    } else {
      this.productsToSession.push(product);
    }
    console.log('lista de producto guardada modificada', this.productsToSession);
  }

  onChangeCountTotal(accion: string) {
    this.renderingStep.cantidadSeleccionada = accion === 'add' ?  this.renderingStep.cantidadSeleccionada + 1 :  this.renderingStep.cantidadSeleccionada - 1;
    this.canSelected = this.renderingStep.cantidad === this.renderingStep.cantidadSeleccionada ? false : true;
    // console.log(this.stepperList);
  }

  changeStep(index: number) {
    this.indexTab = 0;
    this.renderingStep = this.stepperList[index];
    console.log(this.renderingStep);
    if(this.renderingStep) {
      this.getProductsCombo(this.indexTab);
      // this.canSelected = true;
    }
  }

  finishCombo() {
    const message = `
    Ya has seleccionado los productos de tu combo,
    ¿Estás seguro de agregarlo al carrio de compras?`;
    const dialogRef = this.dialog.showDialogConfirm(message);
    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.matdialog.close({ alert:'exito', data: null });
      }
    });
  }

  cancelCombo() {
    const dialogRef = this.dialog.showDialogConfirm('¿Estás seguro de cancelar tu paquete?');
    dialogRef.afterClosed().subscribe(response => {
      // if(response) {
      //   this.matdialog.close({ alert: 'eliminar', data: this.productsToSession});
      // }
      if(response && this.productsToSession.length > 0) {
        console.log(this.productsToSession);
        this.paquesteService.deleteProductOrder(this.idPedido, this.productsToSession[0].idSalida).subscribe({
          next: response => {
            if(response.noEstatus === 5) {
              this.matdialog.close();
            }
          },
          error: error => {
            console.warn(error);
            this.matdialog.close();
          }
        })
      } else {
        this.matdialog.close();
      }
    });
  }

  getType(clave: string, cantidad: number) {
    if(clave === 'BEB') {
      return cantidad === 1 ? 'Bebida' : 'Bebidas';
    } else if(clave === 'PAS') {
      return cantidad === 1 ? 'Paste' : 'Pastes';
    } return
  }

}
