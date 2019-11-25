import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public productos: Producto[] = [];
  public url: string;
  public cargando = true;

  constructor( private http: HttpClient ) {
    this.url = 'https://angular-html-5da5b.firebaseio.com/';
    this.cargarProductos();
  }


  private cargarProductos() {

    this.http.get(this.url + 'productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      this.productos = resp;
      this.cargando = false;
    });
  }
}
