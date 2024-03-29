import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ProductsPrimaryInterface } from '../../../core/ports/primary/products.primary.interface';
import { PaquetePrimaryInterface } from '../../../core/ports/primary/paquete.primary.interface';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { ProductModel, SubCategoryModel } from './../../../core/domain/product.model';
import { SaleProductModel } from './../../../core/domain/sale-product.model';
import { PaqueteModel, StepPaqueteModel } from './../../../core/domain/paquete.model';
import { DialogMessage } from 'src/app/commons/dialog';
import { zip } from 'rxjs';

declare var configuraciones: any;
let estacion = configuraciones.estacion;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title: string = '';
  categoria: string | null = null;
  claveCategoria: string | null = null;
  subCategoria: string | null = null;
  subCategoriasList: SubCategoryModel[] = [];
  productsList: ProductModel[] = [];
  idPedido: number = 0;
  showAvatar: boolean = false;
  stepsList: StepPaqueteModel[] = [];
  noComboAgregado!: number;

  constructor(
    private usecase: ProductsPrimaryInterface,
    private useCasePaquete: PaquetePrimaryInterface,
    private _ps: ProductSharedService,
    private route: ActivatedRoute,
    private dialog: DialogMessage,
  ) { }

  ngOnInit(): void {
    this.getIdPedido();
    this.getProducts();
    setTimeout( () => this. showAvatar = true, 5000);
  }

  getIdPedido() {
    this.usecase.getIdPedido().subscribe({
      next: response => {
        if(response) this.idPedido = response;
      }
    });
  }

  getProducts() {
    this.subCategoria = null;
    this.route.paramMap.pipe(
      switchMap( ((params: ParamMap) => {
        this.claveCategoria = params.get('clave');
        this.categoria = params.get('category');
        return this.usecase.getSubcategories(this.claveCategoria);
      })),
      switchMap( response => {
        this.subCategoriasList = response;
        this.getSubCategory();
        if(this.categoria === 'PAQUETES') {
          return this.useCasePaquete.getCombos(this.idPedido);
        }
        return this.usecase.getProducts(this.claveCategoria, this.subCategoria, this.idPedido);
      })
    ).subscribe(
      response => {
        this.productsList = response;
        this.subCategoria = null;
        if(this.idPedido !== 0) {
          this.getTotalAcount();
        }
      },
      error => console.warn(error)
    )
  }

  getSubCategory() {
    if(this.subCategoriasList.length > 0) {
      // if(!this.subCategoria) {
      //   // console.log('no tengo subcategoria la cambio')
      //   this.subCategoria =  this.subCategoriasList[0].clave;
      // } else {
      //   this.subCategoria =  this.subCategoriasList[0].clave;
      //   console.log('si traigo subcatego');
      //   console.log(this.subCategoria)
      //   // this.subCategoria = null;
      // }
      this.subCategoria =  this.subCategoriasList[0].clave;
    } else {
      this.subCategoria = null;
    }
  }

  getTotalAcount() {
    return this._ps.getTotalProducts(this.idPedido).subscribe();
  }

  onProductSelected(product: ProductModel) {
    const productToSave: SaleProductModel = {
      idSalida: product.idSalida,
      idVenta: this.idPedido,
      codigo: product.codigo,
      idCombo: product.idCombo,
      viewProducto: product,
      cantidad: product.cantidadPedida,
      noCombo: 0,
      caja: estacion,
      estacion: estacion
    };

    this.usecase.productSale(productToSave).subscribe({
      next: response => {
        console.log(response);
        this.idPedido = response?.pk;
        // this.getProducts();
        sessionStorage.setItem('idPedido', `${this.idPedido}`);
        // console.log(this.productsList)
        const indexProd = this.productsList.findIndex( producto => producto.codigo === response.response.codigo);
        // this.productsList[indexProd].cantidadCombo = response.response.cantidadCombo;
        // this.productsList[indexProd].cantidadPedida = response.response.cantidadPedida;
        // this.productsList[indexProd].existencia = response.response.existencia;
        // this.productsList[indexProd].idSalida = response.response.idSalida;
        // this.productsList[indexProd].disponible = response.response.disponible;
        this.productsList[indexProd] = response.response;
        if(this.idPedido !== 0) {
          this.getTotalAcount();
        }
        // this.onChangeSubcategory(this.subCategoria);
      },
      error: error => console.warn(error)
    });
  }

  onInfoProductSelected(product: ProductModel) {
    const dialogRef = this.dialog.showInfoProduct(product, product.linea);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe( response => {
      if(response) {
        let moreProduct: ProductModel = {
          ...product,
          cantidadPedida: product.cantidadPedida + 1
        }
        this.onProductSelected(moreProduct);
      }
    })
  }

  onResponseCreatePack(response: boolean) {
    console.log(response);
    this.showAvatar = false;
  }

  onChangeSubcategory(clave: any) {
    this.subCategoria = clave;
    this.usecase.getProducts(this.claveCategoria, this.subCategoria, this.idPedido).subscribe({
      next: response  => {
        this.productsList = response;
        //this.subCategoria = null;
        if(this.idPedido !== 0) {
          this.getTotalAcount();
        }
      },
      error: error => console.error(error)
    });
  }

  onComboSelected(codigo: string) {
    zip(
      this.useCasePaquete.getDetalleCombo(codigo),
      this.useCasePaquete.getNumeroCombo(this.idPedido, codigo)
    ).subscribe( response => {
      this.noComboAgregado = response[1];
      response[0].forEach( (step, index) => {
        this.addSubCategoriesStepper(codigo, step, response[0].length, index)
      });
    });
  }

  addSubCategoriesStepper(codigo: string, step: PaqueteModel, stepsTotal: number, index: number) {
    this.usecase.getSubcategories(step.familia).subscribe({
      next: subcategories =>  {
        let stepDetail = {
          step: index,
          idCombo: step.idCombo,
          categoria: step.familia,
          cantidad: step.cantidad,
          cantidadSeleccionada: 0,
          sub: subcategories
        };
        this.stepsList.push(stepDetail);
        if(this.stepsList.length === stepsTotal) {
          this.openModalPack(codigo);
        }
      },
      error: error => console.warn(error)
    })
  }

  openModalPack(codigo: string) {
    const dialogRef = this.dialog.showModalPaquete(codigo, this.stepsList, this.idPedido, this.noComboAgregado);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe( (response: any) => {
      console.log(response);
      this.stepsList = [];
      if(response?.alert === 'exito') {
        this.getIdPedido();
        this.getProducts();
      }
    });
  }


}
