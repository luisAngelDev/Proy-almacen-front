import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
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

@Component({
  selector: 'app-venta-autocomplete',
  templateUrl: './venta-autocomplete.component.html',
  styleUrls: ['./venta-autocomplete.component.css']
})
export class VentaAutocompleteComponent {

  form: FormGroup;

  vehiculos: Vehiculo[];
  clientes: Cliente[];
  productos: Producto[];

  //se usa en el autocomplete
  myControlCliente: FormControl = new FormControl();

  clientesFiltrados$: Observable<Cliente[]>;

  maxFecha: Date = new Date();

  precioTotal: number;
  cantidad: number;
  subTotal: number;

  vehiculoSeleccionado: Vehiculo;
  clienteSeleccionado: Cliente;
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

    this.form = new FormGroup({
      'vehiculo': new FormControl(),
      'cliente': this.myControlCliente,
      //'precioTotal': new FormControl(),
      'fecha': new FormControl(new Date()),
      'productos': new FormControl(),
      'cantidad': new FormControl()
    });

    this.listarInicial();

    this.clientesFiltrados$ = this.myControlCliente.valueChanges.pipe(map(val => this.filtrarClientes(val)));

    /* this.listarVehiculos();
    this.listarClientes();
    this.listarProductos(); */

    //this.dataSource = new MatTableDataSource(this.detalleVenta);
  }

  filtrarClientes(val: any) {
    if (val != null && val.idCliente > 0) {
      return this.clientes.filter(el =>
        el.nombre.toLowerCase().includes(val.nombre.toLowerCase()) || el.apellido.toLowerCase().includes(val.apellido.toLowerCase()) || el.dni.includes(val.dni)
      );
    }
    return this.clientes.filter(el =>
      el.nombre.toLowerCase().includes(val?.toLowerCase()) || el.apellido.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
    );
  }

  mostrarCliente(val: any) {
    return val ? `${val.nombre} ${val.apellido}` : val;
  }



  listarInicial(){

    this.vehiculoService.listar().subscribe(data => {
      this.vehiculos = data;
    });

    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });

    this.productoService.listar().subscribe(data => {
      this.productos = data;
    });

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
    // let vehiculo = new Vehiculo();
    // vehiculo.idVehiculo = this.idVehiculoSeleccionado;

    // let cliente = new Cliente();
    // cliente.idCliente = this.idClienteSeleccionado;

    //let producto = new Producto();
    //producto.idProducto = this.idProductoSeleccionado;

    //let precioTotal = 10000;

 //let fecha = this.fechaSeleccionada;

console.log("haciendo click boton");
    let venta = new Venta();
    venta.vehiculo = this.form.value['vehiculo'];
    this.sumarDetalleSubTotal();
    venta.precioTotal = this.precioTotal;

console.log("antes de cliente");
    venta.cliente = this.form.value['cliente'];
    //venta.cliente.idCliente = 1;
    
    venta.fecha = moment(this.form.value['fecha']).format('YYYY-MM-DDTHH:mm:ss');
    
    venta.detalleVenta = this.detalleVenta;

console.log("sin dto");
console.log(venta);
    let dto: VentaDetPlantillaDTO = new VentaDetPlantillaDTO();
    dto.venta = venta;

console.log(venta);


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
    this.clienteSeleccionado = null;
    this.ProductoSeleccionado = null;
    this.vehiculoSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }

}
