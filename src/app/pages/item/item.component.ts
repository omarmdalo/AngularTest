import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { infoProducto } from '../../interfaces/info-producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public productoDescripcion: infoProducto;
  public cargando = true;
  public productoid: string;

  constructor(private route: ActivatedRoute, public _productoService: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this._productoService.getProducto(parametros['id']).subscribe((producto: infoProducto) => {

        setTimeout( () => {
          this.productoid = parametros['id'];
          this.cargando = false;
          this.productoDescripcion = producto;
        }, 500);
      });
    });
  }

}
