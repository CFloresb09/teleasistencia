import { Injectable } from '@angular/core';
import {IUsers} from "../interfaces/i-users";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {CargaUserService} from "./carga-user.service";
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ListaUsersResolveService implements Resolve<IUsers> {

  constructor(private cargaUsers: CargaUserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsers> {
    return this.cargaUsers.getUsers().pipe(
      catchError(error => {
        this.router.navigate(['/inicio']);
        return of(null);
      })
    );
  }
}
