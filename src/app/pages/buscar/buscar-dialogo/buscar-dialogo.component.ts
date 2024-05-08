import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleVenta } from 'src/app/_model/detalleVenta';
import { Venta } from 'src/app/_model/venta';
import { VentaService } from 'src/app/_service/venta.service';

@Component({
  selector: 'app-buscar-dialogo',
  templateUrl: './buscar-dialogo.component.html',
  styleUrls: ['./buscar-dialogo.component.css']
})
export class BuscarDialogoComponent implements OnInit{


  venta: Venta;

  dataSource: MatTableDataSource<DetalleVenta>;
  displayedColumns: string[] = ['nombreProducto', 'precioUnitario',  'cantidad', 'subTotal']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialoRef: MatDialogRef<BuscarDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Venta,
    private ventaService: VentaService
  ){}

  ngOnInit(): void {
    this.venta = {...this.data};

    this.dataSource = new MatTableDataSource(this.data.detalleVenta);
  }

  cerrar(){
    this.dialoRef.close();
  }



}
