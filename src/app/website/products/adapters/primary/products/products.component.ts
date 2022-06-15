import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ProductsPrimaryInterface } from '../../../core/ports/primary/products.primary.interface';
import { ProductModel } from './../../../core/domain/product.model';
import { SaleProductModel } from './../../../core/domain/sale-product.model';

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
    private route: ActivatedRoute
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
        console.log(response);
        this.productsList = response;
      },
      error => console.log(error)
    )
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
        // const index = this.productsList.findIndex(product => product.codigo === response.response.codigo);
        // this.productsList.splice(index, 1, response.response);
      },
      error: error => console.warn(error)
    });
  }


}
