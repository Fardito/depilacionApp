import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { Cliente } from './clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private _clientes = new BehaviorSubject<Cliente[]>([
    new Cliente('asd','Fede','Suarez','1')
  ]);
  

  get clientes(){
    return this._clientes.asObservable();
  }
  constructor() { }

  getClient(id: string){
    return this.clientes.pipe(take(1), map( clientes => {
      return { ...clientes.find(c => c.id === id)};
    }));
  }

  addClient(id: string, firstName: string, lastName: string, celPhone: string){
    const newClient = new Cliente(id,firstName,lastName,celPhone);
    this.clientes.pipe(take(1)).subscribe( clientes => {
      this._clientes.next(clientes.concat(newClient));
    });
  }

  updateClient(clientId: string, firstName: string, lastName: string, celPhone:string){
    return this.clientes.pipe(
      take(1),
      delay(200),
      tap( clientes => {
        const updateClientIndex = clientes.findIndex( client => client.id === clientId);
        const updatedClients = [...clientes];
        const oldClient = updatedClients[updateClientIndex];
        updatedClients[updateClientIndex] = new Cliente(oldClient.id, firstName, lastName, celPhone);
        this._clientes.next(updatedClients);
      })
      );
  }

  deleteClient(ClientId: string){
    return this.clientes.pipe(
      take(1),
      tap( clientes => {
        this._clientes.next(clientes.filter( c => c.id !== ClientId))
      })
    );
  }
}
