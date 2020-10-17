import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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

  addTurno(id: string,hora: string, nombre: string, precio: number, fechaId: string){
    const newTurno = new Turno(id,hora, nombre, precio, fechaId);
    this.turnos.pipe(take(1)).subscribe( turnos => {
      this._turnos.next(turnos.concat(newTurno));
    })
  }

  deleteTurno(id: string){
    return this.turnos.pipe(
      take(1),
      tap( turnos => {
        this._turnos.next(turnos.filter(t => t.id !== id))
      })
    )
  }
}
