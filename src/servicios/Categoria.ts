import { db } from "../baseDeDatos/models/index";
import { Servicio } from "./Servicio";
export class CategoriaServicio extends Servicio {
  constructor() {
    super(db.Categoria);
  }
  async obtenerPregunta(instancia:any){
    return await instancia.getPregunta();
  }
}
