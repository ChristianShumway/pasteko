import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ProductsPrimaryInterface } from '../../../core/ports/primary/products.primary.interface';
import { ProductModel } from './../../../core/domain/product.model';
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
  idCategoria: string | null = null ;
  productsList: ProductModel[] = [];
  idPedido: number = 0;

  constructor(
    private usecase: ProductsPrimaryInterface,
    private _ps: ProductSharedService,
    private route: ActivatedRoute,
    private dialog: DialogMessage,
  ) { }

  ngOnInit(): void {
    this.getIdPedido();
    this.getProducts();
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
        this.idCategoria = params.get('idCategory');
        this.title = this.idCategoria === '18' ?  'Paquetekos' : 'Menú';
        return this.usecase.getProducts(this.idCategoria, this.idPedido);
      }))
    ).subscribe(
      response => {
        // console.log(response);
        this.productsList = response;
        if(this.idPedido !== 0) {
          this.getTotalAcount();
        }
      },
      error => console.log(error)
    )
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

}
