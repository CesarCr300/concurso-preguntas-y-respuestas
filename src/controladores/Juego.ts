import { Ronda } from "./Ronda";
import { Jugador } from "./Jugador";
import { Consola } from "../vistas/consola";
const jugadorDefecto = {
  nombre: "JUGADOR",
  recordRondas: 0,
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
    const { nombre, premio, recordRondas } =
      this.jugador?.retornar_datos_jugador() || jugadorDefecto;
    return Consola.retorna_opcion_desea_continuar(nombre, premio, recordRondas);
  }
  private mensaje_jugador(frase_inicial: string, frase_final: string) {
    let { nombre, recordRondas, premio } =
      this.jugador?.retornar_datos_jugador() || jugadorDefecto;
    Consola.mostrar_mensaje_jugador(
      nombre,
      premio,
      recordRondas,
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
  private async retornar_objeto_ronda(numeroRonda: number) {
    const rondaInstancia = await this.jugador?.crear_instancia_ronda();
    return new Ronda(numeroRonda, rondaInstancia);
  }
  private async retornar_premio_ronda(numeroRonda: number) {
    const ronda = await this.retornar_objeto_ronda(numeroRonda);
    const { pregunta, respuestaCorrecta, alternativas } =
      await ronda.retornar_datos();
    Consola.mostrar_inicio_ronda(numeroRonda, pregunta, alternativas);
    const alternativaEscogida = Consola.retornar_alternativa_escogida();
    return ronda.retornar_premio(
      respuestaCorrecta,
      alternativas,
      alternativaEscogida
    );
  }
  private async ejecucion_rondas() {
    let premio: number;
    for (let numeroRonda = 1; numeroRonda <= 5; numeroRonda++) {
      premio = await this.retornar_premio_ronda(numeroRonda);
      if (premio == 0) {
        await this.jugador_perdio();
        break;
      }
      if (numeroRonda == 5) {
        await this.jugador_gano(premio);
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
    Consola.mostar_juego_finalizado();
  }
}
