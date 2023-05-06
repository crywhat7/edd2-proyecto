import { Component } from "@angular/core";
import { Estados, Vivienda } from "src/app/interfaces/interfaces";
import { ViviendasService } from "src/app/services/viviendas.service";

@Component({
  selector: "app-crear-vivienda",
  templateUrl: "./crear-vivienda.component.html",
  styleUrls: ["./crear-vivienda.component.css"],
})
export class CrearViviendaComponent {
  nuevaVivienda: Vivienda = {
    id: 0,
    nombre: "",
    imagen: "",
    colonia: "",
    ciudad: "",
    precio: 150000,
  };
  constructor(private vService: ViviendasService) {}
  async createVivienda() {
    this.nuevaVivienda.fechaAgregado = new Date();
    this.nuevaVivienda.fechaVenta = new Date();
    this.nuevaVivienda.estado = Estados.DISPONIBLE;
    console.log(this.nuevaVivienda);

    await this.vService.createVivienda(this.nuevaVivienda);
    alert("Vivienda creada");
  }
}
