import { db } from "../baseDeDatos/models/index";
import { Servicio } from "./Servicio";
export class JugadorServicio extends Servicio {
  constructor() {
    super(db.Jugador);
  }
  async crear_instancia_ronda(instancia: any) {
    return await instancia.createRonda();
  }
}
