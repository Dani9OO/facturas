export interface Factura {
  empresa: string,
  ordenDeVenta: string,
  nombreDeCliente: string,
  guias: string[],
  remision: string,
  factura: string
}

export interface Culpa {
  empleado: string,
  fecha: Date
}

export interface Usuario {
  usuario: string,
  password: string
}
