import { JugadorServicio } from "../servicios/Jugador";
import { IJugadorDatos } from "../interfaces/Jugador";
import { Op } from "sequelize";
//ELIMINAR INTERFAZ JUGADOR
const JugadorModelo = new JugadorServicio();
export class Jugador {
  private nombre: string;
  private premio = 0;
  private recordRondas: number = 0;
  private instancia?: any;
  private id: number = 1;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  //crear instancias
  public async crear_instancia() {
    const instancia = await JugadorModelo.crear_instancia({
      nombre: this.nombre,
    });
    this.instancia = instancia;
    this.id = this.instancia.id;
  }
  public async crear_instancia_ronda() {
    return await JugadorModelo.crear_instancia_ronda(this.instancia);
  }
  //manejo de datos
  private async aumentar_record_rondas() {
    await JugadorModelo.actualizar_segun_instancia(this.instancia, {
      record_rondas: this.recordRondas + 1,
    });
    this.instancia = await JugadorModelo.obtener_por_id(this.id);
    this.recordRondas++;
  }
  private async establecer_premio(premio: number) {
    this.premio += premio;
    await JugadorModelo.actualizar_segun_instancia(this.instancia, {
      premio: this.premio,
    });
  }
  //informacion_retornada
  public retornar_datos_jugador(): IJugadorDatos {
    const datos = {
      nombre: this.nombre,
      premio: this.premio,
      recordRondas: this.recordRondas,
    };
    return datos;
  }
  public async retornar_datos_tabla_clasificacion() {
    //solo obtengo los datos que tienen un premio diferente a 0 y ordenados de forma descendente
    const jugadores = await JugadorModelo.obtener_todos({
      where: { premio: { [Op.ne]: null, [Op.ne]: 0 } },
      order: [["premio", "DESC"]],
    });
    return jugadores;
  }
  //acciones
  public async jugador_gano_ronda(premio: number) {
    await this.establecer_premio(premio);
    await this.aumentar_record_rondas();
  }
  public async jugador_perdio_ronda() {
    await JugadorModelo.actualizar_segun_instancia(this.instancia, {
      premio: 0,
    });
  }
}
