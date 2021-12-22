import { db } from "../baseDeDatos/models/index";
import { Servicio } from "./Servicio";

export class RondaServicio extends Servicio {
  constructor() {
    super(db.Ronda);
  }
}
