import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Alarma } from "../../../clases/alarma";
import { User } from "../../../clases/user";
import { CargaAlarmaService } from "../../../servicios/alarmas/carga-alarma.service";
import Swal from "sweetalert2";
import {environment} from "../../../../environments/environment";
import {Paciente} from "../../../clases/paciente";


@Component({
  selector: 'app-modificar-cerrar-alarma',
  templateUrl: './modificar-cerrar-alarma.component.html',
  styleUrls: ['./modificar-cerrar-alarma.component.scss']
})
export class ModificarCerrarAlarmaComponent implements OnInit {
  public alarma: Alarma
  public idAlarma: number
  public paciente_ucr: Paciente


  constructor(private route: ActivatedRoute, private titleService: Title, private router: Router, private cargarAlarmas: CargaAlarmaService) { }

  ngOnInit(): void {
    this.alarma = this.route.snapshot.data['alarma'];
    this.idAlarma = this.route.snapshot.params['id'];
    this.paciente_ucr = this.alarma.id_paciente_ucr
    if (this.alarma.id_teleoperador) {
      this.alarma.id_teleoperador = this.alarma.id_teleoperador.id;
    }
    if (this.alarma.id_paciente_ucr) {
      this.alarma.id_paciente_ucr = this.alarma.id_paciente_ucr.id;
    }


  }
  //buscamos la opcion que coincida con el buscado para dejarla preseleccionada
  optionSelected(i: number): void {
    document.getElementsByClassName('form-select')[i].setAttribute('selected', '');
  }
  modificarAlarma(): void {
    this.alarma.estado_alarma = "Cerrada"
    this.cargarAlarmas.modificarAlarma(this.alarma).subscribe(
      e => {
        this.alertExito()
        this.router.navigate(['/alarmas'])
      },
      error => {
             this.alertError()
      }
    );
  }
  //Toast para el Alert indicando que la operación fue exitosa
  alertExito() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      //El tiempo que permanece la alerta, se obtiene mediante una variable global en environment.ts
      timer: environment.timerToast,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: environment.fraseModificar,
    })
  }
  //Toast para el alert indicando que hubo algún error en la operación
  alertError() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: environment.timerToast,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: environment.fraseErrorModificar
    })
  }
  obtenerNombre() {
    if (this.paciente_ucr) {
      return 'Titular UCR: ' + this.paciente_ucr.id_persona.nombre + ' ' + this.paciente_ucr.id_persona.apellidos
    }
    return 'Titular: ' + this.alarma.id_terminal.id_titular.id_persona.nombre + ' ' + this.alarma.id_terminal.id_titular.id_persona.apellidos +
      ' --- Terminal: ' + this.alarma.id_terminal.numero_terminal
  }
  obtenerTelefonoFijo() {
    if (this.paciente_ucr) {
      return 'Numero de telefono fijo: ' + this.paciente_ucr.id_persona.telefono_fijo
    }
    return 'Numero de telefono Fijo: ' + this.alarma.id_terminal.id_titular.id_persona.telefono_fijo
  }
  obtenerTelefonoMovil() {
    if (this.paciente_ucr) {
      return 'Numero de telefono móvil: ' + this.paciente_ucr.id_persona.telefono_movil
    }
    return 'Numero de telefono Movil: ' + this.alarma.id_terminal.id_titular.id_persona.telefono_movil
  }
}
