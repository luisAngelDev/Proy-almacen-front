import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  dataSource: MatTableDataSource<Vehiculo>;
  displayedColumns: string[] = ['idVehiculo', 'nombre', 'modelo', 'marca', 'color', 'acciones']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.vehiculoService.getVehiculoCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.vehiculoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000 });
    })

    this.vehiculoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number){
    this.vehiculoService.eliminar(id).subscribe(() => {
      this.vehiculoService.listar().subscribe((data) => {
        this.vehiculoService.setVehiculoCambio(data);
        this.vehiculoService.setMensajeCambio('SE ELIMINO');
      });
    });
  }

  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  verificarHijos(){
    return this.route.children.length !== 0
  }


}
