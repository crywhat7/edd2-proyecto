export interface Vivienda {
  fueEliminado?: boolean;
  id: number;
  nombre: string;
  imagen: string;
  colonia: string;
  ciudad: string;
  precio: number;
  estado?: Estados;
  fechaAgregado?: Date;
  fechaVenta?: Date;
  duenio?: string;
}

export enum Estados {
  DISPONIBLE = "DISPONIBLE",
  VENDIDO = "VENDIDO",
  RESERVADO = "RESERVADO",
  REMODELACION = "REMODELACION",
}
