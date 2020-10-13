import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Turno } from '../detail-fecha/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private _turnos = new BehaviorSubject<Turno[]>([]);

  get turnos(){
    return this._turnos.asObservable();
  }

  constructor() { }

  addTurno(hora: string, nombre: string, precio: number){
    const newTurno = new Turno(hora, nombre, precio);
    this.turnos.pipe(take(1)).subscribe( turnos => {
      this._turnos.next(turnos.concat(newTurno));
    })
  }
}
