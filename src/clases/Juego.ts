import { Ronda } from "./Ronda";
import { Jugador } from "./Jugador";
import { prompt } from "../util/prompt";
export class Juego {
  jugador?: Jugador;

  public solicitar_datos_jugador(): string {
    const nombre = prompt("Ingrese su nombre: ");
    return nombre;
  }
  public mensaje_jugador_perdio() {
    console.log("Has perdido");
  }
  public mensaje_jugador_gano() {
    console.log("Has ganado el juego");
  }
  private async crear_jugador(nombre: string) {
    const jugador = new Jugador(nombre);

    this.jugador = jugador;
  }
  public async jugar() {
    const nombre = this.solicitar_datos_jugador();
    await this.crear_jugador(nombre);
    await this.jugador?.crearInstancia();
    let ronda;
    let premio;
    let jugador_perdio = false;
    for (let i = 1; i <= 5; i++) {
      ronda = new Ronda(i);
      premio = await ronda.funcion_principal();
      if (premio == "") {
        jugador_perdio = true;
        await this.jugador?.jugador_perdio_ronda();
        break;
      }
      await this.jugador?.jugador_gano_ronda(premio);
    }
    if (jugador_perdio) {
      this.mensaje_jugador_perdio();
    } else {
      this.mensaje_jugador_gano();
    }
  }
}
