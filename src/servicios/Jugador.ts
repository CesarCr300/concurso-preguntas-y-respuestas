import { db } from "../baseDeDatos/models/index";
import { Servicio } from "./Servicio";
export class JugadorServicio extends Servicio {
  constructor() {
    super(db.Jugador);
  }
}
