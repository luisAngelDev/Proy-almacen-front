import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from '../_model/producto'
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private productoCambio: Subject<Producto[]> = new Subject<Producto[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor( protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/productos`);
   }


     //////get & set ////
     getProductoCambio(){
      return this.productoCambio.asObservable();
    }
  
    setProductoCambio(productos: Producto[]){
      this.productoCambio.next(productos);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajeCambio(mensaje: string){
      this.mensajeCambio.next(mensaje);

   
  }
}