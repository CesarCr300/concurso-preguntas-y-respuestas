import { db } from "../baseDeDatos/models/index";
import { Servicio } from "./Servicio";

import { CategoriaServicio } from "./Categoria";

export class RondaServicio extends Servicio {
  constructor() {
    super(db.Ronda);
  }
  async relacionar_con_categoria(idCategoria: number, instancia: any) {
    const CategoriaModelo = new CategoriaServicio();
    const instanciaCategoria = await CategoriaModelo.obtener_por_id(
      idCategoria
    );
    await instancia.addCategoria(instanciaCategoria);
    return instanciaCategoria;
  }
}
