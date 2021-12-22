import { Ronda } from "./Ronda";
import { Jugador } from "./Jugador";
import { prompt } from "../util/prompt";

const jugadorDefecto = {
  nombre: "JUGADOR",
  record_rondas: 0,
  premio: 0,
};

export class Juego {
  jugador?: Jugador;
  nombre_jugador: string;
  constructor(nombre_jugador: string) {
    this.nombre_jugador = nombre_jugador;
  }
  //mensajes
  private mensaje_desea_continuar() {
    const { nombre, premio, record_rondas } =
      this.jugador?.retornar_datos_jugador() || jugadorDefecto;
    console.log(
      `${nombre} has superado con exito la ronda ${record_rondas}, hasta el momento tienes ${premio} puntos. Si no desea continuar, pulsa la x, si no pulsa cualquier tecla`
    );
    return prompt();
  }
  private mensaje_jugador(frase_inicial: string, frase_final: string) {
    let { nombre, record_rondas, premio } =
      this.jugador?.retornar_datos_jugador() || jugadorDefecto;
    let cadena = `${nombre} ${frase_inicial} llegaste hasta la ronda ${record_rondas}, ${frase_final}`;
    if (premio > 0) {
      cadena += ` ${premio} puntos.`;
    }
    console.log(cadena);
  }
  //se ejecuta segun jugador
  private async jugador_perdio() {
    await this.jugador?.jugador_perdio_ronda();
    this.mensaje_jugador("has perdido", "mejor suerte para la próxima.");
  }
  private async jugador_gano(premio: number) {
    await this.jugador?.jugador_gano_ronda(premio);
    this.mensaje_jugador("felicidades", "ganaste");
  }
  //creacion jugador
  private async crear_jugador(nombre: string) {
    const jugador = new Jugador(nombre);
    await jugador.crear_instancia();
    this.jugador = jugador;
  }
  //ejecución/lógica del juego
  private desea_continuar() {
    const opcion = this.mensaje_desea_continuar();
    return opcion !== "x";
  }
  private async ejecucion_rondas() {
    let ronda;
    let premio: number;
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
        if (!this.desea_continuar()) {
          this.mensaje_jugador("felicidades", "has ganado:");
          break;
        }
      }
    }
  }
  public async jugar() {
    await this.crear_jugador(this.nombre_jugador);
    this.ejecucion_rondas();
  }
}
