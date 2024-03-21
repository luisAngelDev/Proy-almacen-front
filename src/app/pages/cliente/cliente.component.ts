import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['idCliente', 'nombres', 'apellidos', 'dni', 'telefono', 'email', 'direccion', 'acciones']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.clienteService.getClienteCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000 });
    })

    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  eliminar(id: number){
    this.clienteService.eliminar(id).subscribe(() => {
      this.clienteService.listar().subscribe((data) => {
        this.clienteService.setClienteCambio(data);
        this.clienteService.setMensajeCambio('SE ELIMINO');
      });
    });
  }


  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
