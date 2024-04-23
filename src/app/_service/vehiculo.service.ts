import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, retry } from 'rxjs';
import { GenericService } from './generic.service';
import { Vehiculo } from '../_model/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService extends GenericService<Vehiculo>{


  private VehiculoCambio: Subject<Vehiculo[]> = new Subject<Vehiculo[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient){
    super(
      http,
      `${environment.HOST}/vehiculos`);
  }

  ////get  and set ///

  getVehiculoCambio(){
    return this.VehiculoCambio.asObservable();
  }

  setVehiculoCambio(vehiculos: Vehiculo[]){
    return this.VehiculoCambio.next(vehiculos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
