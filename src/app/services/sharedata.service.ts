import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Vivienda } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class ShareDataService {
  // ! BehaviorSubject
  private actualizarComponentes: BehaviorSubject<Componentes> =
    new BehaviorSubject<Componentes>({});
  private vistaActual: BehaviorSubject<vista> = new BehaviorSubject<vista>(
    "CREAR"
  );
  private viviendaSeleccionada: BehaviorSubject<Vivienda | null> =
    new BehaviorSubject<Vivienda | null>(null);

  // ! Observable
  $actualizarComponentes = this.actualizarComponentes.asObservable();
  $vistaActual = this.vistaActual.asObservable();
  $viviendaSeleccionada = this.viviendaSeleccionada.asObservable();

  // ! Funciones
  setComponentes(componentes: Componentes) {
    this.actualizarComponentes.next(componentes);
  }
  setVista(vista: vista) {
    this.vistaActual.next(vista);
  }
  setViviendaSeleccionada(vivienda: Vivienda | null) {
    this.viviendaSeleccionada.next(vivienda);
  }

  constructor() {}
}

interface Componentes {
  listaViviendas?: boolean;
}

export type vista = "VER" | "CREAR";
