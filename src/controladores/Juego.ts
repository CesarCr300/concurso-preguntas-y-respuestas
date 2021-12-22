import { Ronda } from "./Ronda";
import { Jugador } from "./Jugador";
import { prompt } from "../util/prompt";
import { Consola } from "../vistas/consola";
const ConsolaVista = new Consola();

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
    return ConsolaVista.retorna_opcion_desea_continuar(
      nombre,
      premio,
      record_rondas
    );
  }
  private mensaje_jugador(frase_inicial: string, frase_final: string) {
    let { nombre, record_rondas, premio } =
      this.jugador?.retornar_datos_jugador() || jugadorDefecto;
    ConsolaVista.mostrar_mensaje_jugador(
      nombre,
      premio,
      record_rondas,
      frase_inicial,
      frase_final
    );
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
  private async retornar_objeto_ronda(numero_ronda: number) {
    const ronda_instancia = await this.jugador?.crear_instancia_ronda();
    return new Ronda(numero_ronda, ronda_instancia);
  }
  private async retornar_premio_ronda(numero_ronda: number) {
    const ronda = await this.retornar_objeto_ronda(numero_ronda);
    const { pregunta, respuesta_correcta, alternativas } =
      await ronda.retornar_datos();
    ConsolaVista.mostrar_inicio_ronda(numero_ronda, pregunta, alternativas);
    const alternativa_escogida = ConsolaVista.retornar_alternativa_escogida();
    return ronda.retornar_premio(
      respuesta_correcta,
      alternativas,
      alternativa_escogida
    );
  }
  private async ejecucion_rondas() {
    let premio: number;
    for (let numero_ronda = 1; numero_ronda <= 5; numero_ronda++) {
      premio = await this.retornar_premio_ronda(numero_ronda);
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
          this.mensaje_jugador("felicitaciones,", "has ganado:");
          break;
        }
      }
    }
  }
  public async jugar() {
    await this.crear_jugador(this.nombre_jugador);
    await this.ejecucion_rondas();
    ConsolaVista.mostar_juego_finalizado();
  }
}
