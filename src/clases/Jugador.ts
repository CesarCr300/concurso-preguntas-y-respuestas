import { JugadorServicio } from "../servicios/Jugador";
import { IJugadorDatos } from "../interfaces/Jugador";
//ELIMINAR INTERFAZ JUGADOR
const JugadorModelo = new JugadorServicio();
export class Jugador {
  private nombre: string;
  private premio=0;
  private record_rondas: number = 0;
  private instancia?: any;
  private id: number = 1;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  //crear_instancia
  public async crearInstancia() {
    const instancia = await JugadorModelo.create({ nombre: this.nombre });
    this.instancia = instancia;
    this.id = this.instancia.id;
  }
  private async establecer_premio(premio: number) {
    this.premio+=premio;
    await JugadorModelo.updateByInstance(this.instancia, {
      premio: this.premio,
    });
  }
  private async aumentar_record_rondas() {
    await JugadorModelo.updateByInstance(this.instancia, {
      record_rondas: this.record_rondas + 1,
    });
    this.instancia = await JugadorModelo.getById(this.id);
    this.record_rondas++;
  }
  public retornar_datos_jugador(): IJugadorDatos {
    const datos = {
      nombre: this.nombre,
      premio: this.premio,
      record_rondas: this.record_rondas,
    };
    return datos;
  }
  public async jugador_gano_ronda(premio: number) {
    await this.establecer_premio(premio);
    await this.aumentar_record_rondas();
  }
  public async jugador_perdio_ronda() {
    //premios:""
    await JugadorModelo.updateByInstance(this.instancia, { premio: 0 });
  }
}
