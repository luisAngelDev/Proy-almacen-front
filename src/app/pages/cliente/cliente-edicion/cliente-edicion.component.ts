import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit{

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl(''),
      'direccion': new FormControl(''),
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });


  }

  initForm(){
    if(this.edicion){
      this.clienteService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idCliente),
          'nombres': new FormControl(data.nombre),
          'apellidos': new FormControl(data.apellido),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'email': new FormControl(data.email),
          'direccion': new FormControl(data.direccion)
        });

      });
    }
  }

  operar(){
    //let id = this.form.value['id'];
    let cliente = new Cliente();
    cliente.idCliente = this.form.value['id'];
    cliente.nombre = this.form.value['nombres'];
    cliente.apellido = this.form.value['apellidos'];
    cliente.dni = this.form.value['dni'];
    cliente.telefono = this.form.value['telefono'];
    cliente.email = this.form.value['email'];
    cliente.direccion = this.form.value['direccion'];

    if(this.edicion){
      //modificar
      //FORMA IDEAL
      this.clienteService.modificar(cliente).pipe(switchMap( () => {
        return this.clienteService.listar();
      }))
      .subscribe(data => {
        this.clienteService.setClienteCambio(data);
          this.clienteService.setMensajeCambio('SE   MODIFICO')
      });

      /*
      this.clienteService.modificar(cliente).subscribe(()=>{
        this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteCambio.next(data);
          this.clienteService.mensajeCambio.next('SE MODIFICO');
        });
      });*/
    }else{
      //registrar
      this.clienteService.registrar(cliente).subscribe(()=>{
        this.clienteService.listar().subscribe(data => {
          this.clienteService.setClienteCambio(data);
          this.clienteService.setMensajeCambio('SE REGISTRO');
        })
      });
    }

    this.router.navigate(['/pages/cliente']);

  }

}