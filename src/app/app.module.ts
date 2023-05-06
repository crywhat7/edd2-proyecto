import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ListaViviendasComponent } from "./components/lista-viviendas/lista-viviendas.component";
import { CardViviendaComponent } from "./components/card-vivienda/card-vivienda.component";
import { CrearViviendaComponent } from "./components/crear-vivienda/crear-vivienda.component";

@NgModule({
  declarations: [
    AppComponent,
    ListaViviendasComponent,
    CardViviendaComponent,
    CrearViviendaComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
