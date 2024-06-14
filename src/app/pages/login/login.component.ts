import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario: string;
  clave: string;
  mensaje: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){ }
  
  ngOnInit(): void {
    
  }

  iniciarSesion(){//se almacena el token en memoria
    
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      
      this.router.navigate(['/pages/inicio'])
    });

  }
  // iniciarSesion(){
  //   this.loginService.login(this.usuario, this.clave).subscribe(data => console.log(data));
  // }


  ngAfterViewInit(){
    (window as any).initialize();
  }

}
