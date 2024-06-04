import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentaDetPlantillaDTO } from '../dto/ventaDetPlantillaDTO';
import { Venta } from '../_model/venta';
import { FiltroVentaDTO } from '../dto/filtroVentaDTO';

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
  // buscar en un rango de dos fechas 
  buscarFecha(fecha1: string, fecha2: string){
    return this.http.get<Venta[]>(`${this.url}/buscar?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  //buscar por dni y nombrescompleto
  buscarOtros(filtroVenta: FiltroVentaDTO){
    return this.http.post<Venta[]>(`${this.url}/buscar/otros`, filtroVenta);
  }

  //listar reporte fecha y cantidad
  listarResumen(){
    return this.http.get<any[]>(`${this.url}/listarResumen`);
  }

  //pdfs
  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`, { responseType: 'blob'});
  }

}
