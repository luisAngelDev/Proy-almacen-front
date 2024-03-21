import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion.component';

const routes: Routes = [
  { path: 'pages/cliente', component: ClienteComponent, children: [
      {path: 'nuevo', component: ClienteEdicionComponent },
      {path: 'edicion/:id', component: ClienteEdicionComponent }
  ]
},
  { path: 'pages/producto', component: ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
