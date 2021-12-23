import { prompt } from "../util/prompt";

export class Consola {
  public static retorna_opcion_desea_continuar(
    nombre: string,
    premio: number,
    recordRondas: number
  ) {
    console.log(
      `${nombre} has superado con exito la ronda ${recordRondas}, hasta el momento tienes ${premio} puntos. Si no desea continuar, pulsa la x, si no pulsa cualquier tecla`
    );
    return prompt();
  }
  public static retornar_alternativa_escogida() {
    let esOpcionValida = false;
    let alternativaEscogida = "";
    do {
      console.log("Ingrese 1,2,3 o 4.");
      alternativaEscogida = prompt("Su respuesta es: ");
      switch (alternativaEscogida) {
        case "1":
        case "2":
        case "3":
        case "4":
          esOpcionValida = true;
          break;
      }
    } while (!esOpcionValida);
    this.mostrar_separacion();
    return alternativaEscogida;
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
    recordRondas: number,
    fraseInicial: string,
    fraseFinal: string
  ) {
    let cadena = `${nombre} ${fraseInicial} llegaste hasta la ronda ${recordRondas}, ${fraseFinal}`;
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
    cantidadTop: number
  ) {
    console.log(`TOP ${cantidadTop}`);
    for (let jugador of jugadores.slice(0, cantidadTop)) {
      console.log(`${jugador.nombre}: ${jugador.premio}`);
    }
    this.mostrar_separacion();
  }
}
