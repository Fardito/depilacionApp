import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Fecha } from './fechas.model';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  private _fechas = new BehaviorSubject<Fecha[]>([]);

  get fechas(){
    return this._fechas.asObservable();
  }

  addFecha(fechaId:string, fecha: Date){
    const newFecha = new Fecha(fechaId,fecha);
    this.fechas.pipe(take(1)).subscribe( fechas => {
      this._fechas.next(fechas.concat(newFecha));
    })
  }

  getFecha(id: string){
    return this.fechas.pipe(
      take(1),
      map( fechas => {
        return {...fechas.find(f => f.id === id)}
      })
      )
  }
  constructor() { }
}
