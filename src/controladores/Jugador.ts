import { JugadorServicio } from "../servicios/Jugador";
import { IJugadorDatos } from "../interfaces/Jugador";
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
  //crear_instancia
  public async crear_instancia() {
    const instancia = await JugadorModelo.crear_instancia({
      nombre: this.nombre,
    });
    this.instancia = instancia;
    this.id = this.instancia.id;
  }
  public async crear_instancia_ronda(){
    return await JugadorModelo.crear_instancia_ronda(this.instancia);
  }
  //manejo de datos
  private async aumentar_record_rondas() {
    await JugadorModelo.actualizar_segun_instancia(this.instancia, {
      recordRondas: this.recordRondas + 1,
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
