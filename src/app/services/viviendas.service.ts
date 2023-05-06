import { Injectable } from "@angular/core";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { Estados, Vivienda } from "../interfaces/interfaces";

const RUTA_CARPETA = "PROYECTOEDD2_ARCHIVOS";
const ARCHIVOS = {
  VIVIENDAS: "viviendas.txt",
};
const SEPARADOR = "#";

@Injectable({
  providedIn: "root",
})
export class ViviendasService {
  constructor() {}

  async getViviendas() {
    const documentosRuta = await documentDir();
    const viviendas = await readTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`
    );
    return this.txtToViviendasArray(viviendas);
  }

  async getUltimoIdVivienda() {
    const viviendas = await this.getViviendas();
    const ultimoID = viviendas.reduce((acc, vivienda) => {
      if (vivienda.id > acc) {
        return vivienda.id;
      }
      return acc;
    }, 0);
    return ultimoID ?? 0;
  }

  async createVivienda(vivienda: Vivienda) {
    vivienda.id = (await this.getUltimoIdVivienda()) + 1;
    const viviendaTXT = this.viviendaToTXT(vivienda);
    const documentosRuta = await documentDir();
    const viviendas = await readTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`
    );
    const viviendasArray = viviendas.split("\n");
    viviendasArray.push(viviendaTXT);
    const viviendasTXT = viviendasArray.join("\n");
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`,
      viviendasTXT
    );
    return {
      ok: true,
      mensaje: "Vivienda creada correctamente",
    };
  }

  viviendaToTXT(vivienda: Vivienda) {
    return `${vivienda.id}${SEPARADOR}${vivienda.nombre}${SEPARADOR}${
      vivienda.imagen
    }${SEPARADOR}${vivienda?.colonia ?? ""}${SEPARADOR}${
      vivienda.ciudad
    }${SEPARADOR}${vivienda.precio}${SEPARADOR}${vivienda.estado}${SEPARADOR}${
      vivienda?.fechaAgregado?.toISOString() ?? new Date().toISOString()
    }${SEPARADOR}${
      vivienda?.fechaVenta?.toISOString() ?? new Date().toISOString()
    }${SEPARADOR}${vivienda.duenio}`;
  }
  txtToViviendasArray(viviendasTXT: string) {
    const viviendasArray = viviendasTXT?.split("\n")?.filter((v) => v) ?? [];
    const viviendas: Vivienda[] =
      viviendasArray.map((vivienda) => {
        const [
          id,
          nombre,
          imagen,
          colonia,
          ciudad,
          precio,
          estado,
          fechaAgregado,
          fechaVenta,
          duenio,
        ] = vivienda.split(SEPARADOR);
        return {
          id: Number(id),
          nombre,
          imagen,
          colonia,
          ciudad,
          precio: Number(precio),
          estado: Estados[estado as keyof typeof Estados],
          fechaAgregado: new Date(fechaAgregado),
          fechaVenta: new Date(fechaVenta),
          duenio,
        };
      }) ?? [];

    return viviendas;
  }
}
