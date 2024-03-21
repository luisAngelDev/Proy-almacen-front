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



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    ClienteEdicionComponent,
    ProductoDialogoComponent
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
