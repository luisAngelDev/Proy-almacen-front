import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteEdicionComponent } from './cliente/cliente-edicion/cliente-edicion.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { VehiculoEdicionComponent } from './vehiculo/vehiculo-edicion/vehiculo-edicion.component';
import { ProductoComponent } from './producto/producto.component';
import { VentaComponent } from './venta/venta.component';
import { VentaAutocompleteComponent } from './venta-autocomplete/venta-autocomplete.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ReporteComponent } from './reporte/reporte.component';
import { InicioComponent } from './inicio/inicio.component';
import { GuardService } from '../_service/guard.service';
import { Not403Component } from './not403/not403.component';

export const routes: Routes = [

    { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },

    { 
        path: 'cliente', component: ClienteComponent, children: [
          {path: 'nuevo', component: ClienteEdicionComponent },
          {path: 'edicion/:id', component: ClienteEdicionComponent }
        ], canActivate: [GuardService]
      },
      {
        path: 'vehiculo', component: VehiculoComponent, children: [
          {path: 'nuevo', component: VehiculoEdicionComponent },
          {path: 'edicion/:id', component: VehiculoEdicionComponent }
        ], canActivate: [GuardService]
      },
      { path: 'producto', component: ProductoComponent, canActivate: [GuardService] },
      { path: 'venta', component: VentaComponent, canActivate: [GuardService] },
      { path: 'venta-autocomplete', component: VentaAutocompleteComponent, canActivate: [GuardService] },
      { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
      { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
      { path: 'not-403', component: Not403Component },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}