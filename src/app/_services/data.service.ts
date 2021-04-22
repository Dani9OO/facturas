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
      const factura = evt.split('/');
      const factura$ = this.firestore.collection<Factura>('facturas', ref => ref
      .where('remision2', '==', factura[3])
      .where('empresa', '==', factura[0])
      .where('ordenDeVenta', '==', factura[1])
      .limit(1)
      ).valueChanges();
      factura$.subscribe({ next: async (facturas) => {
        if (facturas.length > 0) {
          await this.firestore.collection<Culpa>('culpa').add({ empleado: localStorage.getItem('usuario') || 'Error al obtener usuario' });
          resolve(new Error(`Factura ${evt} ya existe`));
        } else {
          await this.firestore.collection('facturas').add({
            empresa: factura[0],
            ordenDeVenta: factura[1],
            remision1: factura[2],
            remision2: factura[3],
            factura: factura[4]
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
      ).valueChanges();
      usuario$.subscribe({ next: async (usuario) => {
        if(usuario.length > 0) {
          localStorage.setItem('usuario', usuario[0].usuario)
          resolve(`${usuario[0].usuario} autenticado con éxito`)
        } else {
          resolve(new Error('Inicio de sesión inválido, corrobora tus credenciales.'))
        }
      }, error: error => reject(error) });
    })
  }

  // Implementar logout en algún lugar
  async logout() {
    localStorage.removeItem('usuario');
  }

}
