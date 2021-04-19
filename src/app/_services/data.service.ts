import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Factura } from '../common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public facturas$: Observable<Factura[]>;

  constructor(private firestore: AngularFirestore) {
    this.facturas$ = this.firestore.collection<Factura>('facturas').valueChanges();
  }

  async newFactura(evt: string): Promise<string | Error> {
    let existe = false;
    this.facturas$.subscribe(x => {
      existe = x.find(factura => factura.remision === evt) ? true : false;
    });
    if (existe) return new Error(`Factura ${evt} ya existe`);
    try {
      await this.firestore.collection('facturas').add({ remisión: evt });
      return `Factura ${evt} registrada con éxito`
    } catch (error) {
      return error;
    }
  }

}
