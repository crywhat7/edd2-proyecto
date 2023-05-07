import { Component } from "@angular/core";
import { ShareDataService, vista } from "./services/sharedata.service";
import { ViviendasService } from "./services/viviendas.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private sDService: ShareDataService,
    private vService: ViviendasService
  ) {
    this.sDService.$vistaActual.subscribe((vista) => {
      this.vista = vista;
    });
  }
  title = "viviendas";
  vista: vista = "CREAR";

  setVista(vista: vista) {
    this.sDService.setVista(vista);
  }

  async empaquetarArchivos() {
    const respuesta = await window.confirm(
      "¿Estás seguro de que quieres empaquetar los archivos?\nEsto limpiara el archivo de viviendas para que no quede ningun registro eliminado"
    );
    if (respuesta) {
      const eliminado = await this.vService.limpiarEliminados();
      if (!eliminado?.ok) {
        alert("Ha ocurrido un error");
        return;
      }
      alert("Archivos empaquetados correctamente");
    }
  }
}
