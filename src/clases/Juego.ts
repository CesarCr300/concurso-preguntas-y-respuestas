import { Ronda } from "./Ronda";
import { Jugador } from "./Jugador";
import { prompt } from "../util/prompt";
export class Juego {
  jugador?: Jugador;
  //separar jugador
  private solicitar_datos_jugador(): string {
    const nombre = prompt("Ingrese su nombre: ");
    return nombre;
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
  private async jugador_perdio() {
    await this.jugador?.jugador_perdio_ronda();
    this.mensaje_jugador_perdio();
  }
  //creacion
  private async crear_jugador(nombre: string) {
    const jugador = new Jugador(nombre);
    this.jugador = jugador;
  }
  //ejecución/lógica del juego
  private async ejecucion_rondas() {
    let ronda;
    let premio;
    for (let i = 1; i <= 5; i++) {
      ronda = new Ronda(i);
      premio = await ronda.funcion_principal();
      if (premio == 0) {
        this.jugador_perdio();
        break;
      }
      if (i == 5) {
        this.mensaje_jugador_gano();
        break;
      } else {
        await this.jugador?.jugador_gano_ronda(premio);
      }
    }
  }
  public async jugar() {
    const nombre = this.solicitar_datos_jugador();
    await this.crear_jugador(nombre);
    await this.jugador?.crearInstancia();

    this.ejecucion_rondas();
  }
}
