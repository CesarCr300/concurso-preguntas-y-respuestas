import { JugadorServicio } from "../servicios/Jugador";
import { IJugadorDatos } from "../interfaces/Jugador";

const JugadorModelo = new JugadorServicio();
export class Jugador {
  private nombre: string;
  private premios: string[] = [];
  private record_rondas: number = 0;
  private instancia?: any;
  private id: number = 1;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  public async crearInstancia() {
    const instancia = await JugadorModelo.create({ nombre: this.nombre });
    this.instancia = instancia;
    this.id = this.instancia.id;
  }
  private async establecer_premio(premio: string) {
    const premios = [...this.premios, premio];
    this.premios = premios;
    const premiosString = premios.join(",");
    await JugadorModelo.updateByInstance(this.instancia, {
      premios: premiosString,
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
    return {
      nombre: this.nombre,
      premios: this.premios,
      record_rondas: this.record_rondas,
    };
  }
  public async jugador_gano_ronda(premio: string) {
    await this.establecer_premio(premio);
    await this.aumentar_record_rondas();
  }
  public async jugador_perdio_ronda() {
    this.premios = [];
  }
}
