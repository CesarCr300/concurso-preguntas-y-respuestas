import { Ronda } from "./Ronda";
import { Jugador } from "./Jugador";
import { prompt } from "../util/prompt";
export class Juego {
  jugador?: Jugador;
  nombre_jugador: string;
  constructor(nombre_jugador: string) {
    this.nombre_jugador = nombre_jugador;
  }
  //mensajes
  private mensaje_desea_continuar() {}
  private mensaje_jugador_perdio() {
    let objeto = this.jugador?.retornar_datos_jugador() || {
      nombre: "JUGADOR",
      record_rondas: 0,
    };
    console.log(
      objeto.nombre +
        " has perdido. Lograste ganar: " +
        objeto.record_rondas +
        " rondas mejor suerte para la próxima."
    );
  }
  private mensaje_jugador_gano() {
    let objeto = this.jugador?.retornar_datos_jugador() || {
      nombre: "Jugador",
      premio: 100,
    };
    console.log(
      "Felicidades " +
        objeto.nombre +
        " has superado exitosamente las 5 rondas del juego. Tu premio es de: " +
        objeto.premio
    );
  }
  //se ejecuta segun jugador
  private async jugador_perdio() {
    await this.jugador?.jugador_perdio_ronda();
    this.mensaje_jugador_perdio();
  }
  private async jugador_gano(premio: number) {
    await this.jugador?.jugador_gano_ronda(premio);
    this.mensaje_jugador_gano();
  }
  //creacion jugador
  private async crear_jugador(nombre: string) {
    const jugador = new Jugador(nombre);
    await jugador.crear_instancia();
    this.jugador = jugador;
  }
  //ejecución/lógica del juego
  private async ejecucion_rondas() {
    let ronda;
    let premio;
    for (let numero_ronda = 1; numero_ronda <= 5; numero_ronda++) {
      ronda = new Ronda(numero_ronda);
      premio = await ronda.comenzar_ronda();
      if (premio == 0) {
        this.jugador_perdio();
        break;
      }
      if (numero_ronda == 5) {
        this.jugador_gano(premio);
        break;
      } else {
        await this.jugador?.jugador_gano_ronda(premio);
      }
    }
  }
  public async jugar() {
    await this.crear_jugador(this.nombre_jugador);
    this.ejecucion_rondas();
  }
}
