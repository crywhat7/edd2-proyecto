import { Component } from "@angular/core";
import { Vivienda } from "src/app/interfaces/interfaces";
import { ShareDataService } from "src/app/services/sharedata.service";
import { Estados } from "src/app/interfaces/interfaces";
import { ViviendasService } from "src/app/services/viviendas.service";

@Component({
  selector: "app-info-vivienda",
  templateUrl: "./info-vivienda.component.html",
  styleUrls: ["./info-vivienda.component.css"],
})
export class InfoViviendaComponent {
  viviendaSeleccionada: Vivienda | null = null;
  nuevoPrecio = 0;
  estados = Estados;
  constructor(
    private sDService: ShareDataService,
    private vService: ViviendasService
  ) {
    this.sDService.$viviendaSeleccionada.subscribe((vivienda) => {
      this.viviendaSeleccionada = vivienda;
      if (vivienda) {
        this.nuevoPrecio = vivienda.precio;
      }
    });
  }
  async changeEstado(estado: Estados) {
    if (this.viviendaSeleccionada) {
      const res = await this.vService.actualizarEstadoVivienda(
        this.viviendaSeleccionada.id,
        estado
      );
      if (res?.ok) {
        this.viviendaSeleccionada.estado = estado;
        this.sDService.setViviendaSeleccionada(this.viviendaSeleccionada);
        this.sDService.setComponentes({
          listaViviendas: true,
        });
      }
    }
  }
  async changePrecio() {
    if (this.viviendaSeleccionada) {
      const res = await this.vService.actualizarPrecioVivienda(
        this.viviendaSeleccionada.id,
        this.nuevoPrecio
      );
      if (res?.ok) {
        this.viviendaSeleccionada.precio = this.nuevoPrecio;
        this.sDService.setViviendaSeleccionada(this.viviendaSeleccionada);
        this.sDService.setComponentes({
          listaViviendas: true,
        });
      }
    }
  }
  async eliminarVivienda() {
    if (this.viviendaSeleccionada) {
      // Dialogo de confirmación del api del navegador
      const respuesta = await window.confirm(
        "¿Estás seguro de que quieres eliminar la vivienda?"
      );

      if (!respuesta) return;

      const res = await this.vService.eliminarVivienda(
        this.viviendaSeleccionada?.id || -1
      );
      if (res?.ok) {
        this.sDService.setViviendaSeleccionada(null);
        this.sDService.setVista("CREAR");
        this.sDService.setComponentes({
          listaViviendas: true,
        });
      }
    }
  }
}
