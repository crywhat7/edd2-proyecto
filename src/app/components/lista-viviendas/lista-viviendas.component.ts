import { Component } from "@angular/core";
import { ViviendasService } from "../../services/viviendas.service";
import { Vivienda, Estados } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-lista-viviendas",
  templateUrl: "./lista-viviendas.component.html",
  styleUrls: ["./lista-viviendas.component.css"],
})
export class ListaViviendasComponent {
  searchText = "";
  viviendas: Vivienda[] = [];
  constructor(private vService: ViviendasService) {
    // this.createVivienda();
    this.getViviendas();
  }
  async getViviendas() {
    const viviendas = await this.vService.getViviendas();
    this.viviendas = viviendas;
  }
}
