import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Vehiculo } from 'src/app/_model/vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-vehiculo-edicion',
  templateUrl: './vehiculo-edicion.component.html',
  styleUrls: ['./vehiculo-edicion.component.css']
})
export class VehiculoEdicionComponent implements OnInit{

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: VehiculoService
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'modelo': new FormControl(''),
      'marca': new FormControl(''),
      'color': new FormControl(''),
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })

  }

  initForm(){
    if(this.edicion){
      this.clienteService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idVehiculo),
          'nombres': new FormControl(data.nombre),
          'modelo': new FormControl(data.modelo),
          'marca': new FormControl(data.marca),
          'color': new FormControl(data.color),
        });

      });
    }
  }

  operar(){

    let vehiculo = new Vehiculo();
    vehiculo.idVehiculo = this.form.value['id'];
    vehiculo.nombre = this.form.value['nombres'];
    vehiculo.modelo = this.form.value['modelo'];
    vehiculo.marca = this.form.value['marca'];
    vehiculo.color = this.form.value['color'];

    if(this.edicion){
      //modificar
      //FORMA IDEAL
      this.clienteService.modificar(vehiculo).pipe(switchMap( () => {
        return this.clienteService.listar();
      }))
      .subscribe(data => {
        this.clienteService.setVehiculoCambio(data);
          this.clienteService.setMensajeCambio('SE MODIFICO')
      });
    }else{
      //registrar
      this.clienteService.registrar(vehiculo).subscribe(()=>{
        this.clienteService.listar().subscribe(data => {
          this.clienteService.setVehiculoCambio(data);
          this.clienteService.setMensajeCambio('SE REGISTRO');
        })
      });
    }

    this.router.navigate(['/pages/vehiculo']);
  }

}
