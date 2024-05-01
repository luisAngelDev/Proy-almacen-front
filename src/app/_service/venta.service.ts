import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentaDetPlantillaDTO } from '../dto/ventaDetPlantillaDTO';

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

}
