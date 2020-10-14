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

  addTurno(hora: Date, nombre: string, precio: number){
    console.log(hora);
    const newTurno = new Turno(hora.toString(), nombre, precio);
    this.turnos.pipe(take(1)).subscribe( turnos => {
      this._turnos.next(turnos.concat(newTurno));
    })
  }
}
