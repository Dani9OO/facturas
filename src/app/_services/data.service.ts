import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Factura, Culpa } from '../common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public facturas$: Observable<Factura[]>;
  public facturasCollection: AngularFirestoreCollection<Factura>;

  constructor(private firestore: AngularFirestore) {
    this.facturas$ = this.firestore.collection<Factura>('facturas').valueChanges();
    this.facturasCollection = this.firestore.collection<Factura>('facturas');
  }

  async newFactura(evt: string): Promise<string | Error> {
    try {
      const existe = this.firestore.collection<Factura>('facturas', ref => ref.where('remision', '==', evt));
      if (existe) {
        await this.firestore.collection<Culpa>('culpa').add({ empleado: 'Raúl' });
        return new Error(`Factura ${evt} ya existe`);
      }
      await this.firestore.collection('facturas').add({ remisión: evt });
      return `Factura ${evt} registrada con éxito`
    } catch (error) {
      return error;
    }
  }

}
