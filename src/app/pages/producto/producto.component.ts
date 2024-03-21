import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { ProductoDialogoComponent } from './producto-dialogo/producto-dialogo.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ['idproducto', 'nombre','marca', 'stock', 'preciounitario', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    this.productoService.getProductoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.productoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  
    this.productoService.listar().subscribe(data => {
      this.crearTabla(data);
    });
  }


  crearTabla(data: Producto[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  abrirDialogo(producto?: Producto) {
    this.dialog.open(ProductoDialogoComponent, {
      width: '250px',
      data: producto
    });
  }

  eliminar(producto: Producto) {
    this.productoService.eliminar(producto.idProducto).pipe(switchMap( ()=> {
      return this.productoService.listar();
    }))      
    .subscribe(data => {
      this.productoService.setProductoCambio(data);
      this.productoService.setMensajeCambio('SE ELIMINO');  
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
