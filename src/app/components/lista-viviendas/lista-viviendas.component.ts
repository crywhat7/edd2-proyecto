import { Component } from "@angular/core";
import { ViviendasService } from "../../services/viviendas.service";
import { Vivienda, Estados } from "src/app/interfaces/interfaces";
import { ShareDataService } from "src/app/services/sharedata.service";

@Component({
  selector: "app-lista-viviendas",
  templateUrl: "./lista-viviendas.component.html",
  styleUrls: ["./lista-viviendas.component.css"],
})
export class ListaViviendasComponent {
  searchText = "";
  viviendas: Vivienda[] = [];
  constructor(
    private vService: ViviendasService,
    private sD: ShareDataService
  ) {
    this.sD.$actualizarComponentes.subscribe((componentes) => {
      if (componentes?.listaViviendas) {
        this.getViviendas();
      }
    });
    this.getViviendas();
  }
  async getViviendas() {
    const viviendas = await this.vService.getViviendas();
    this.viviendas = viviendas.filter((v) => !v.fueEliminado);
  }
  seleccionarVivienda(vivienda: Vivienda) {
    this.sD.setViviendaSeleccionada(vivienda);
    this.sD.setVista("VER");
  }
}
