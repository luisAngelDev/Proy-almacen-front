import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { DetalleVenta } from 'src/app/_model/detalleVenta';
import { Producto } from 'src/app/_model/producto';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { Venta } from 'src/app/_model/venta';
import { ClienteService } from 'src/app/_service/cliente.service';
import { ProductoService } from 'src/app/_service/producto.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { VentaService } from 'src/app/_service/venta.service';
import * as moment from 'moment';
import { VentaDetPlantillaDTO } from 'src/app/dto/ventaDetPlantillaDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {


  //vehiculos: Vehiculo[];
  vehiculos$: Observable<Vehiculo[]>;
  clientes$: Observable<Cliente[]>;
  productos$: Observable<Producto[]>;

  maxFecha: Date = new Date();

  precioTotal: number;
  //producto: Producto;
  cantidad: number;
  subTotal: number;

  idVehiculoSeleccionado: number;
  idClienteSeleccionado: number;
  ProductoSeleccionado: Producto;
  fechaSeleccionada: Date = new Date();

  detalleVenta: DetalleVenta[] = [];

  dataSource: MatTableDataSource<DetalleVenta>;
  displayedColumns: string[] = ['producto', 'nombre', 'precioUnitario', 'cantidad', 'subTotal', 'acciones']

  constructor(
    private vehiculoService: VehiculoService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(): void{
    this.listarVehiculos();
    this.listarClientes();
    this.listarProductos();

    //this.dataSource = new MatTableDataSource(this.detalleVenta);
  }

  listarVehiculos(){
    // this.vehiculoService.listar().subscribe(data => {
    //   this.vehiculos = data;
    // });
    this.vehiculos$ = this.vehiculoService.listar();
  }

  listarClientes(){
    this.clientes$ = this.clienteService.listar();
  }

  listarProductos(){
    this.productos$ = this.productoService.listar();
  }

  agregar(){
    
    let prod = new Producto()
    prod = this.ProductoSeleccionado;

    let subTotalFinal = prod.precioUnitario * this.cantidad;

    let det = new DetalleVenta();
    det.producto = prod;
    det.cantidad = this.cantidad;
    det.subTotal = subTotalFinal;
   

    this.detalleVenta.push(det);
    this.dataSource = new MatTableDataSource(this.detalleVenta);

    this.snackBar.open("SE AGREGO PRODUCTO", "AVISO", {duration: 2000});


    console.log(det);
  }

  removerProducto(index: number) {

    //encuentro la posicion del producto seleccionado y borro de la lista el objeto de esa posicion
    if (index > 0) {

      console.log(index)
      let position = 0;
      for (let i = 0; i < this.detalleVenta.length; i++) {
        let detalleVenta = this.detalleVenta[i];
        if (detalleVenta.producto.idProducto === index) {
          
          position = i;
          break;
        }
      }
      this.detalleVenta.splice(position, 1);

      position = 0;
      this.snackBar.open("SE BORRO EL PRODUCTO", "AVISO", {duration: 2000});

      this.dataSource = new MatTableDataSource(this.detalleVenta);
      console.log(this.detalleVenta);

    }

  }

  sumarDetalleSubTotal(){

    let acumulador = 0;
      for (let i = 0; i < this.detalleVenta.length; i++) {
          acumulador = acumulador + this.detalleVenta[i].subTotal;
      }
    this.precioTotal = acumulador;
  }

  aceptar(){
    let vehiculo = new Vehiculo();
    vehiculo.idVehiculo = this.idVehiculoSeleccionado;

    let cliente = new Cliente();
    cliente.idCliente = this.idClienteSeleccionado;

    //let producto = new Producto();
    //producto.idProducto = this.idProductoSeleccionado;

    //let precioTotal = 10000;

 //let fecha = this.fechaSeleccionada;

    let venta = new Venta();
    venta.vehiculo = vehiculo;
    venta.cliente = cliente;
    this.sumarDetalleSubTotal();
    venta.precioTotal = this.precioTotal;
    venta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    venta.detalleVenta = this.detalleVenta;

    let dto: VentaDetPlantillaDTO = new VentaDetPlantillaDTO();
    dto.venta = venta;


    this.ventaService.registrarTransaccion(dto).subscribe(()=>{
      this.snackBar.open("SE REGISTRO LA VENTA", "AVISO", {duration: 2000});

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });

  }

  limpiarControles(){
    this.detalleVenta = [];
    this.dataSource = new MatTableDataSource(this.detalleVenta);
    this.subTotal = null;
    this.precioTotal = null;
    this.cantidad = null;
    this.idClienteSeleccionado = 0;
    this.ProductoSeleccionado = null;
    this.idVehiculoSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }

  removerProductoLista(){

  }

  

}


