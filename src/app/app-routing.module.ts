import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { VehiculoEdicionComponent } from './pages/vehiculo/vehiculo-edicion/vehiculo-edicion.component';
import { VentaComponent } from './pages/venta/venta.component';
import { VentaAutocompleteComponent } from './pages/venta-autocomplete/venta-autocomplete.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  { 
    path: 'pages/cliente', component: ClienteComponent, children: [
      {path: 'nuevo', component: ClienteEdicionComponent },
      {path: 'edicion/:id', component: ClienteEdicionComponent }
    ]
  },
  {
    path: 'pages/vehiculo', component: VehiculoComponent, children: [
      {path: 'nuevo', component: VehiculoEdicionComponent },
      {path: 'edicion/:id', component: VehiculoEdicionComponent }
    ]
  },
  { path: 'pages/producto', component: ProductoComponent },
  { path: 'pages/venta', component: VentaComponent },
  { path: 'pages/venta-autocomplete', component: VentaAutocompleteComponent },
  { path: 'pages/buscar', component: BuscarComponent },
  { path: 'pages/reporte', component: ReporteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
