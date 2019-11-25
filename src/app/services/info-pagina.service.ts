import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  infoEquipo: any = {};
  cargada = false;
  public url: string;

  constructor(private _http: HttpClient) {

    this.url = 'https://angular-html-5da5b.firebaseio.com/';

    this.cargarInfo();
    this.cargarEquipo(this.url);


  }


  private cargarInfo() {

    // Aqui vamos a leer el archivo JSON
    this._http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });

  }


  private cargarEquipo( url: string) {

    // Aqui vamos a leer el archivo JSON del servicion de firebase
    this._http.get(url + 'equipo.json')
      .subscribe((resp: any) => {

        this.infoEquipo = resp;
      });

  }
}
