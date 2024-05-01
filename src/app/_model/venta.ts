import { Cliente } from "./cliente";
import { DetalleVenta } from "./detalleVenta";
import { Vehiculo } from "./vehiculo";

export class Venta{
    idVenta: number;
    vehiculo: Vehiculo;
    cliente: Cliente;
    precioTotal: Number;
    fecha: string;
    detalleVenta: DetalleVenta[];
}