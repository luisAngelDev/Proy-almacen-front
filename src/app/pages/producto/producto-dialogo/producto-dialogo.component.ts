import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-producto-dialogo',
  templateUrl: './producto-dialogo.component.html',
  styleUrls: ['./producto-dialogo.component.css']
})
export class ProductoDialogoComponent implements OnInit{

  producto: Producto;

  constructor(
    private dialogRef: MatDialogRef<ProductoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Producto,
    private productoService: ProductoService
  ){}

  ngOnInit(): void {
    this.producto = { ...this.data };
    //this.producto = this.data;
  }

  operar(){

    if(this.producto != null && this.producto.idProducto > 0){
      //MODIFICAR
      this.productoService.modificar(this.producto).pipe(switchMap( () => {
        return this.productoService.listar();
      }))
      .subscribe(data =>{
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('SE MODIFICO');
      });
    }
    else{
      this.productoService.registrar(this.producto).pipe(switchMap( () => {
        return this.productoService.listar();
      }))
      .subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }


  cerrar(){
    this.dialogRef.close();
  }


}
