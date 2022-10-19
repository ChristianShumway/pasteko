import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ProductsPrimaryInterface } from '../../../core/ports/primary/products.primary.interface';
import { ProductModel, SubCategoryModel } from './../../../core/domain/product.model';
import { SaleProductModel } from './../../../core/domain/sale-product.model';
import { ProductSharedService } from 'src/app/core/services/products.service';
import { DialogMessage } from 'src/app/commons/dialog';

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

  constructor(
    private usecase: ProductsPrimaryInterface,
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
    this.route.paramMap.pipe(
      switchMap( ((params: ParamMap) => {
        this.claveCategoria = params.get('clave');
        this.categoria = params.get('category');
        return this.usecase.getSubcategories(this.claveCategoria);
      })),
      switchMap( response => {
        this.subCategoriasList = response;
        this.getSubCategory();
        console.log(this.categoria);
        if(this.categoria === 'Paquetes') {
          return this.usecase.getCombos(this.idPedido);
        }
        return this.usecase.getProducts(this.claveCategoria, this.subCategoria, this.idPedido);
      })
    ).subscribe(
      response => {
        console.log(response);
        this.productsList = response;
        this.subCategoria = null;
        if(this.idPedido !== 0) {
          this.getTotalAcount();
        }
      },
      error => console.log(error)
    )
  }

  getSubCategory() {
    if(this.subCategoriasList.length > 0) {
      if(!this.subCategoria) {
        this.subCategoria =  this.subCategoriasList[0].clave;
      }
    } else {
      this.subCategoria = null;
    }
    console.log(this.subCategoria);
  }

  getTotalAcount() {
    return this._ps.getTotalProducts(this.idPedido).subscribe();
  }

  onProductSelected(product: ProductModel) {
    const productToSave: SaleProductModel = {
      idSalida: product.idSalida,
      idVenta: this.idPedido,
      codigo: product.codigo,
      viewProducto: product,
      cantidad: product.cantidadPedida
    };

    this.usecase.productSale(productToSave).subscribe({
      next: response => {
        console.log(response);
        this.idPedido = response?.pk;
        this.getProducts();
      },
      error: error => console.warn(error)
    });
  }

  onInfoProductSelected(product: ProductModel) {
    const dialogRef = this.dialog.showInfoProduct(product, 'individual');
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
        this.subCategoria = null;
        if(this.idPedido !== 0) {
          this.getTotalAcount();
        }
      },
      error: error => console.error(error)
    })
  }

}
