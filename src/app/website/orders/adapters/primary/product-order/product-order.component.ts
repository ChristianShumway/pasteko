import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductModel } from 'src/app/website/products/core/domain/product.model';
import { ComboDescripcionModel, ProductOrderModel } from './../../../core/domain/order-detail.model';
@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent implements OnInit {
  productOrder!: any
  @Input() set product(data: ProductOrderModel) {
    if(data) {
      this.productOrder = data;
    }
  }
  @Output() productSelected = new EventEmitter<ProductOrderModel>();
  @Output() deleteProduct = new EventEmitter<ProductOrderModel>();
  @Output() deleteCombo = new EventEmitter<ComboDescripcionModel>();
  countProduct!: FormControl;
  canSelected: boolean = true;
  combosSeccionados: ComboDescripcionModel[] = [];

  constructor() { }

  ngOnInit(): void {
    if(!this.productOrder.detalle) {
      this.canSelected = this.productOrder.viewProducto.existencia > 0 ? true : false;
      this.countProduct = new FormControl(this.productOrder?.cantidad);
      this.countProduct.valueChanges.subscribe({
        next: response  => {
          this.productOrder.cantidad = response.currentValue;
          this.productSelected.emit(this.productOrder);
          this.canSelected = this.productOrder.viewProducto.existencia > 0 ? true : false;
        }
      });
    } else {
      this.separaCombos();
      this.countProduct = new FormControl(1);
    }
  }

  separaCombos() {
    const productos: ProductOrderModel[] = this.productOrder?.detalle;
    let tipoCantidad = '';
    productos.forEach(producto => {
      tipoCantidad = this.getTipoLinea(producto?.viewProducto.linea, producto?.cantidad);
      let index = this.combosSeccionados.findIndex(combo => combo?.noCombo === producto?.noCombo);
      if(index === -1) {
        const combo:ComboDescripcionModel = {
          noCombo: producto?.noCombo,
          descripcion: `${tipoCantidad} ${producto?.viewProducto?.descripcion.toLowerCase()}, `,
          idSalida: producto?.idSalida
        };
        this.combosSeccionados.push(combo);
      } else {
        this.combosSeccionados[index].descripcion += ` ${tipoCantidad} ${producto?.viewProducto?.descripcion.toLowerCase()}, `;
      }
    });
  }

  deleteProductOrder(product: ProductOrderModel) {
    this.deleteProduct.emit(product);
  }

  deleteComboOrder(combo: ComboDescripcionModel) {
    this.deleteCombo.emit(combo);
  }

  getContenido(productText: string) {
    return productText.substring(0, productText.length - 2);
  }

  getTipoLinea(linea:string, cantidad: number) {
    if(linea === '01' ) {
      return cantidad === 1 ? '1 paste' : `${cantidad} pastes`;
    }
    return `${cantidad}`;
  }

}
