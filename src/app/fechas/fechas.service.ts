import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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

  getClient(id: string){
    return this.fechas.pipe(take(1), map( fechas => {
      return { ...fechas.find(f => f.id === id)};
    }));
  }

  updateFecha(fechaId: string, fecha: Date){
    return this.fechas.pipe(
      take(1),
      tap( fechas => {
        const updateFechaIndex = fechas.findIndex( fecha => fecha.id === fechaId);
        const updatedFechas = [...fechas];
        const oldFecha = updatedFechas[updateFechaIndex];
        updatedFechas[updateFechaIndex] = new Fecha(oldFecha.id, fecha);
        this._fechas.next(updatedFechas);
      })

    )
  }

  deleteFecha(id: string){
    return this.fechas.pipe(
      take(1),
      tap( fechas => {
        this._fechas.next(fechas.filter( f => f.id !== id));
      })
    )
  }
}
