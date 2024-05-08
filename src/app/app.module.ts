import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoDialogoComponent } from './pages/producto/producto-dialogo/producto-dialogo.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { VehiculoEdicionComponent } from './pages/vehiculo/vehiculo-edicion/vehiculo-edicion.component';
import { VentaComponent } from './pages/venta/venta.component';
import { VentaAutocompleteComponent } from './pages/venta-autocomplete/venta-autocomplete.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarDialogoComponent } from './pages/buscar/buscar-dialogo/buscar-dialogo.component';



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    ClienteEdicionComponent,
    ProductoDialogoComponent,
    VehiculoComponent,
    VehiculoEdicionComponent,
    VentaComponent,
    VentaAutocompleteComponent,
    BuscarComponent,
    BuscarDialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule, //Formularios
    FormsModule //Two Way Binding,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
