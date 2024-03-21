import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../_model/cliente';
import { Subject, retry } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{


  private clienteCambio: Subject<Cliente[]> = new Subject<Cliente[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient){
    super(
      http,
      `${environment.HOST}/clientes`);
  }

  //private url: string = `${environment.HOST}/clientes`;

  //constructor (private http: HttpClient) { }

  /*listar(){
    return this.http.get<Cliente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  registrar(cliente: Cliente){
    return this.http.post(this.url, cliente);
  }

  modificar(cliente: Cliente){
    return this.http.put(this.url, cliente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
*/

  ////get  and set ///

  getClienteCambio(){
    return this.clienteCambio.asObservable();
  }

  setClienteCambio(clientes: Cliente[]){
    return this.clienteCambio.next(clientes);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
