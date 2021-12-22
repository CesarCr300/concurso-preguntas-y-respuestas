import { prompt } from "../util/prompt";

export class Consola {
  public static retorna_opcion_desea_continuar(
    nombre: string,
    premio: number,
    record_rondas: number
  ) {
    console.log(
      `${nombre} has superado con exito la ronda ${record_rondas}, hasta el momento tienes ${premio} puntos. Si no desea continuar, pulsa la x, si no pulsa cualquier tecla`
    );
    this.mostrar_separacion();
    return prompt();
  }
  public static retornar_alternativa_escogida() {
    let es_opcion_valida = false;
    let alternativa_escogida = "";
    do {
      console.log("Ingrese 1,2,3 o 4.");
      alternativa_escogida = prompt("Su respuesta es: ");
      switch (alternativa_escogida) {
        case "1":
        case "2":
        case "3":
        case "4":
          es_opcion_valida = true;
          break;
      }
    } while (!es_opcion_valida);
    this.mostrar_separacion();
    return alternativa_escogida;
  }
  public static retornar_nombre_jugador() {
    return prompt("Ingrese el nombre del jugador: ");
  }
  private static mostrar_separacion() {
    console.log("------------------------------------------------");
  }
  public static mostrar_mensaje_jugador(
    nombre: string,
    premio: number,
    record_rondas: number,
    frase_inicial: string,
    frase_final: string
  ) {
    let cadena = `${nombre} ${frase_inicial} llegaste hasta la ronda ${record_rondas}, ${frase_final}`;
    if (premio > 0) {
      cadena += ` ${premio} puntos.`;
    }
    console.log(cadena);
    this.mostrar_separacion();
  }
  public static mostar_juego_finalizado() {
    console.log("El juego ha finalizado.");
  }
  public static async mostrar_inicio_ronda(
    numeroRonda: number,
    pregunta: string,
    alternativas: string[]
  ) {
      this.mostrar_separacion();
      console.log(`RONDA N°${numeroRonda}`);
      console.log(pregunta);
      let numero_alternativa = 1;
      for (let alternativa of alternativas) {
        console.log(numero_alternativa + ") " + alternativa);
        numero_alternativa++;
      }
  }
  public static mostrar_tabla_clasificacion(
    jugadores: any,
    cantidad_top: number
  ) {
    console.log(`TOP ${cantidad_top}`);
    for (let jugador of jugadores.slice(0, cantidad_top)) {
      console.log(`${jugador.nombre}: ${jugador.premio}`);
    }
    this.mostrar_separacion();
  }
}
