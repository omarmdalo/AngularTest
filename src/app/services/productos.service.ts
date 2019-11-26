import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public productos: Producto[] = [];
  public productosFiltrado: Producto[] = [];
  public url: string;
  public cargando = true;

  constructor(private http: HttpClient) {
    this.url = 'https://angular-html-5da5b.firebaseio.com/';
    this.cargarProductos();
  }


  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });
  }

  getProducto(id: string) {
    return this.http.get(this.url + 'productos/' + id + '.json');
  }


  buscarProducto(termino: string) {

    if( this.productos.length == 0 ){
      this.cargarProductos().then( () => {
        // Aqui aplicamos el filtro
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push( prod );
      }
    });
  }
}
