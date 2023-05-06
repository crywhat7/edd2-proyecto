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
  viviendaPrueba: Vivienda = {
    id: 1,
    nombre: "Casa de prueba 2",
    imagen: "https://picsum.photos/200/300",
    colonia: "Colonia de prueba 2",
    ciudad: "Ciudad de prueba 2",
    precio: 1000000,
    estado: Estados.DISPONIBLE,
    fechaAgregado: new Date(),
    fechaVenta: new Date(),
    duenio: "Duenio de prueba",
  };
  constructor(private vService: ViviendasService) {
    // this.createVivienda();
    this.getViviendas();
  }
  async getViviendas() {
    const viviendas = await this.vService.getViviendas();
    this.viviendas = viviendas;
  }
  async createVivienda() {
    const vivienda = await this.vService.createVivienda(this.viviendaPrueba);
    console.log(vivienda);
  }
}
