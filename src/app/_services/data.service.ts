import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Factura, Culpa, Usuario } from '../common.interfaces';

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
    return new Promise((resolve, reject) => {
      const factura$ = this.firestore.collection<Factura>('facturas', ref => ref.where('remision', '==', evt).limit(1)).valueChanges();
      factura$.subscribe({ next: async (facturas) => {
        if (facturas.length > 0) {
          await this.firestore.collection<Culpa>('culpa').add({ empleado: 'Raúl' });
          resolve(new Error(`Factura ${evt} ya existe`));
        } else {
          await this.firestore.collection('facturas').add({ remision: evt });
          resolve(`Factura ${evt} registrada con éxito`)
        }
      }, error: error => reject(error) });
    });
  }

  async login(user: string, pass: string) {
    const query = this.firestore.collection<Usuario>('usuarios', ref => ref.where('usuario', '==', user).where('password', '==', pass));
    let usuario: any[] = [];
    query.get().subscribe(x => usuario = x.docs);
    console.log(usuario);
    if (!usuario) return new Error('Usuario o contraseña incorrectos');
    return 'Autenticado éxitosamente';
  }

}
