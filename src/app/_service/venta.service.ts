import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentaDetPlantillaDTO } from '../dto/ventaDetPlantillaDTO';
import { Venta } from '../_model/venta';
import { FiltroConsultaDTO } from '../dto/filtroConsultaDTO';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url: string = `${environment.HOST}/ventas`

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(ventaDTO: VentaDetPlantillaDTO){
    return this.http.post(this.url, ventaDTO);
  }

  buscarFecha(fecha1: string, fecha2: string){
    return this.http.get<Venta[]>(`${this.url}/buscar?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  buscarOtros(filtroConsulta: FiltroConsultaDTO){
    return this.http.post<Venta[]>(`${this.url}/buscar/otros`, filtroConsulta);
  }

}
