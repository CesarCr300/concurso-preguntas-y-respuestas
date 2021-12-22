import { prompt } from "../util/prompt";

export class Consola {
  public retorna_opcion_desea_continuar(
    nombre: string,
    premio: number,
    record_rondas: number
  ) {
    console.log(
      `${nombre} has superado con exito la ronda ${record_rondas}, hasta el momento tienes ${premio} puntos. Si no desea continuar, pulsa la x, si no pulsa cualquier tecla`
    );
    return prompt();
  }
  public mostrar_mensaje_jugador(
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
  }
  public mostar_juego_finalizado(){
    console.log("El juego ha finalizado.")
  }
}
