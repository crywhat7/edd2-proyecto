import { Injectable } from "@angular/core";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { Estados, Vivienda } from "../interfaces/interfaces";

const RUTA_CARPETA = "PROYECTOEDD2_ARCHIVOS";
const ARCHIVOS = {
  VIVIENDAS: "viviendas.txt",
  ELIMINADOS: "eliminados.txt",
};
const SEPARADOR = "#";
const ELIMINADO = "***ELIMINADO***";
const TAMANIO_MAXIMO = 300;

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

  async getVivienda(id: number) {
    const viviendas = await this.getViviendas();
    return viviendas.find((vivienda) => vivienda.id === id);
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
    this.establecerTamanioLinea();
    return {
      ok: true,
      mensaje: "Vivienda creada correctamente",
    };
  }

  async eliminarVivienda(id: number) {
    const viviendas = await this.getViviendas();
    const vivienda = viviendas.find((v) => v.id === id);
    if (!vivienda) {
      return {
        ok: false,
        mensaje: "No existe la vivienda",
      };
    }
    vivienda.fueEliminado = true;
    const viviendasTXT = viviendas
      .map((v) => {
        if (v.id === id) {
          return ELIMINADO;
        }
        return this.viviendaToTXT(v);
      })
      .join("\n");
    const documentosRuta = await documentDir();
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`,
      viviendasTXT
    );
    this.actualizarListaEliminados();

    return {
      ok: true,
      mensaje: "Vivienda eliminada correctamente",
    };
  }

  async actualizarEstadoVivienda(id: number, nuevoEstado: Estados) {
    const viviendas = await this.getViviendas();
    const vivienda = viviendas.find((v) => v.id === id);
    if (!vivienda) {
      return {
        ok: false,
        mensaje: "No existe la vivienda",
      };
    }
    vivienda.estado = nuevoEstado;
    if (nuevoEstado === Estados.VENDIDO) {
      vivienda.fechaVenta = new Date();
    }
    const viviendasTXT = viviendas.map((v) => this.viviendaToTXT(v)).join("\n");
    const documentosRuta = await documentDir();
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`,
      viviendasTXT
    );
    this.establecerTamanioLinea();

    return {
      ok: true,
      mensaje: "Vivienda actualizada correctamente",
    };
  }

  async actualizarPrecioVivienda(id: number, nuevoPrecio: number) {
    const viviendas = await this.getViviendas();
    const vivienda = viviendas.find((v) => v.id === id);
    if (!vivienda) {
      return {
        ok: false,
        mensaje: "No existe la vivienda",
      };
    }
    vivienda.precio = nuevoPrecio;
    const viviendasTXT = viviendas.map((v) => this.viviendaToTXT(v)).join("\n");
    const documentosRuta = await documentDir();
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`,
      viviendasTXT
    );
    this.establecerTamanioLinea();

    return {
      ok: true,
      mensaje: "Vivienda actualizada correctamente",
    };
  }

  async actualizarListaEliminados() {
    const viviendas = await this.getViviendas();
    const registrosEliminados: string[] = [];
    viviendas.forEach((v, index) => {
      if (v.fueEliminado) {
        const texto = `En la linea ${index + 1} se encontraba una vivienda`;
        registrosEliminados.push(texto);
      }
    });
    if (registrosEliminados.length === 0) {
      const mensaje = "No se encontraron viviendas eliminadas";
      registrosEliminados.push(mensaje);
    }
    const documentosRuta = await documentDir();
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.ELIMINADOS}`,
      registrosEliminados.join("\n")
    );
    this.establecerTamanioLinea();
  }

  async limpiarEliminados() {
    const viviendas = (await this.getViviendas()).filter(
      (v) => !v.fueEliminado
    );
    const viviendasTXT = viviendas.map((v) => this.viviendaToTXT(v)).join("\n");
    const documentosRuta = await documentDir();
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`,
      viviendasTXT
    );
    await this.actualizarListaEliminados();
    return {
      ok: true,
      mensaje: "Eliminados limpiados correctamente",
    };
  }

  async establecerTamanioLinea() {
    // Queremos que cada linea tenga un maximo de 300 caracteres, así que se quiere que el archivo de viviendas agrege los caracteres necesarios o elimine los sobrantes
    const viviendas = await this.getViviendas();
    const viviendasTXT = viviendas.map((v) => this.viviendaToTXT(v));
    const lineasCon300Caracteres = viviendasTXT.map((v) => {
      if (v.length > TAMANIO_MAXIMO) {
        return v.slice(0, TAMANIO_MAXIMO);
      }
      if (v.length < TAMANIO_MAXIMO) {
        return v.padEnd(TAMANIO_MAXIMO, " ");
      }
      return v;
    });
    const documentosRuta = await documentDir();
    const nuevasViviendasTXT = lineasCon300Caracteres.join("\n");
    await writeTextFile(
      `${documentosRuta}${RUTA_CARPETA}/${ARCHIVOS.VIVIENDAS}`,
      nuevasViviendasTXT
    );
  }

  viviendaToTXT(vivienda: Vivienda) {
    if (vivienda.fueEliminado) return ELIMINADO;
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
        if (vivienda === ELIMINADO) {
          return {
            fueEliminado: true,
            id: -1,
            nombre: "",
            imagen: "",
            colonia: "",
            ciudad: "",
            precio: -1,
          };
        }
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
