import { db } from "../baseDeDatos/models/index";
import { Servicio } from "./Servicio";
export class PreguntaServicio extends Servicio {
  constructor() {
    super(db.Pregunta);
  }
  async obtener_respuestas_erradas(instancia:any){
    return await instancia.getRespuestaErradas();
  }
}
