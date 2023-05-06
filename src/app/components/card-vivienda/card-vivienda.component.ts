import { Component, Input } from "@angular/core";
import { Vivienda } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-card-vivienda",
  templateUrl: "./card-vivienda.component.html",
  styleUrls: ["./card-vivienda.component.css"],
})
export class CardViviendaComponent {
  @Input() vivienda!: Vivienda;
}
