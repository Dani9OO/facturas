import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Factura, Culpa, Usuario } from '../common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public facturas$: Observable<Factura[]>;
  public facturasCollection: AngularFirestoreCollection<Factura>;

  constructor(private firestore: AngularFirestore) {
    this.facturas$ = this.firestore.collection<Factura>('facturas').valueChanges({ idField: 'id' });
    this.facturasCollection = this.firestore.collection<Factura>('facturas');
  }

  async newFactura(evt: string): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      const factura = evt.split('/');
      const guías = factura[3].split('|');
      const factura$ = this.firestore.collection<Factura>('facturas', ref => ref
      .where('remision', '==', factura[4])
      .where('empresa', '==', factura[0])
      .where('ordenDeVenta', '==', factura[1])
      .limit(1)
      ).get();
      factura$.subscribe({ next: async (f) => {
        if (f.docs.length > 0) {
          await this.firestore.collection<Culpa>('culpa').add({
            empleado: localStorage.getItem('usuario') || 'Error al obtener usuario',
            fecha: new Date()
          });
          resolve(new Error(`Factura ${evt} ya existe`));
        } else {
          await this.firestore.collection('facturas').add({
            empresa: factura[0],
            ordenDeVenta: factura[1],
            nombreDeCliente: factura[2],
            guias: guías,
            remision: factura[4],
            factura: factura[5]
          });
          resolve(`Factura ${evt} registrada con éxito`)
        }
      }, error: error => reject(error) });
    });
  }

  async login(user: string, pass: string) {
    return new Promise((resolve, reject) => {
      const usuario$ = this.firestore.collection<Usuario>('usuarios', ref => ref
      .where('usuario', '==', user)
      .where('password', '==', pass)
      .limit(1)
      ).get();
      usuario$.subscribe({ next: async (usuario) => {
        if(usuario.docs.length > 0) {
          localStorage.setItem('usuario', usuario.docs[0].get('nombre'))
          resolve(`${usuario.docs[0].get('nombre')} autenticado con éxito`)
        } else {
          resolve(new Error('Inicio de sesión inválido, corrobora tus credenciales.'))
        }
      }, error: error => reject(error) });
    })
  }

  async validarFactura(id: string, guías: String[]): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      const factura$ = this.firestore.collection<Factura>('facturas', ref => ref
      .where('id', '==', id)
      .where('guias', 'array-contains-any', guías) // Buscar si ya existe alguna de las guías registradas en el documento
      .limit(1)
      ).get();
      factura$.subscribe({ next: async (factura) => {
        if(factura.docs.length > 0) {
          resolve(`La factura contienee las guías escaneadas`);
        } else {
          resolve(new Error(`La factura no tiene las guías escaneadas`));
        }
      }, error: error => reject(error) });
    })
  }

  async agregarGuía(id: string, guía: string) {
    return this.firestore.collection('facturas').doc(id).update({ guias: firebase.firestore.FieldValue.arrayUnion(guía) });
  }

  // Implementar logout en algún lugar
  async logout() {
    localStorage.removeItem('usuario');
  }

}
