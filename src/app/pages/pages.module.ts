import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { ClienteEdicionComponent } from './cliente/cliente-edicion/cliente-edicion.component';
import { ProductoDialogoComponent } from './producto/producto-dialogo/producto-dialogo.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { VehiculoEdicionComponent } from './vehiculo/vehiculo-edicion/vehiculo-edicion.component';
import { VentaComponent } from './venta/venta.component';
import { VentaAutocompleteComponent } from './venta-autocomplete/venta-autocomplete.component';
import { BuscarComponent } from './buscar/buscar.component';
import { BuscarDialogoComponent } from './buscar/buscar-dialogo/buscar-dialogo.component';
import { ReporteComponent } from './reporte/reporte.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';

@NgModule({
    imports: [
        MaterialModule,
        PagesRoutingModule, //mas links
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,//falta flex
        PdfViewerModule,
    ],
    exports: [],
    declarations: [
        InicioComponent, // inicio 
        ClienteComponent,
        ProductoComponent,
        ClienteEdicionComponent,
        ProductoDialogoComponent,
        VehiculoComponent,
        VehiculoEdicionComponent,
        VentaComponent,
        VentaAutocompleteComponent,
        BuscarComponent,
        BuscarDialogoComponent,
        ReporteComponent,
        LayoutComponent,
        Not403Component,
        Not404Component,
    ],
    providers: [],
})
export class PagesModule { }
