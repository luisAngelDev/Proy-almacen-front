import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    //1) verificar si esta logueado
    let rpta = this.loginService.estaLogueado();
    if(!rpta){
      this.loginService.cerrarSesion();
      return false;
    }

    //2) verificar si el token no ha expirado
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    if(!helper.isTokenExpired(token)){
      //3) verificar si tiene el rol necesario para acceder a esa pagina
      //url -> /pages/paciente
      let url = state.url;

      const decodedToken = helper.decodeToken(token);

      return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
        this.menuService.setMenuCambio(data);

        let cont = 0;
        for (let m of data) {//si dentro de estas opciones de menu esta la url que busco retorna true
          if(url.startsWith(m.url)){
            cont++;
            break;
          }
        }

        if (cont > 0) {
          return true;
        } else { //de lo contrario retorna false
          this.router.navigate(['/pages/not-403']);
          return false;
        }

      }));
      
    } else {
      this.loginService.cerrarSesion();
      return false;
    }

  }
  
}
