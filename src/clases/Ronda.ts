import { Categoria } from "./Categoria";
import { prompt } from "../util/prompt";
import { RondaServicio } from "../servicios/Ronda";

const RondaModelo = new RondaServicio();
export class Ronda {
  //analizar nombre de ronda
  private numero_ronda: number;
  private premio: number = 0;
  private instancia: any;
  constructor(numero_ronda: number, instancia: any) {
    this.numero_ronda = numero_ronda;
    this.instancia = instancia;
  }
  //mostrar datos
  private mostrar_pregunta(pregunta: string) {
    console.log(pregunta);
  }
  private mostrar_alternativas(alternativas: string[]) {
    let numero_alternativa = 1;
    for (let alternativa of alternativas) {
      console.log(numero_alternativa + ") " + alternativa);
      numero_alternativa++;
    }
  }
  //logica
  private corroborar_alternativa_escogida(
    respuesta_correcta: string,
    alternativas: string[],
    alternativa_escogida: string
  ): boolean {
    const posicion_alternativa_correcta =
      alternativas.indexOf(respuesta_correcta) + 1;
    return posicion_alternativa_correcta.toString() == alternativa_escogida;
  }
  //retornar datos
  private async retornar_datos_pregunta_aleatoria() {
    const numeroPregunta: number = Math.floor(Math.random() * 4 + 1);
    const instanciaCategoria = await RondaModelo.relacionar_con_categoria(
      this.numero_ronda,
      this.instancia
    );
    const categoria = new Categoria(this.numero_ronda, instanciaCategoria);
    this.premio = await categoria.retornar_premio();
    return await categoria.retornar_datos_pregunta(numeroPregunta);
  }
  private retornar_alternativas_desordenadas(
    alternativa_correcta: string,
    alternativas_erradas: string[]
  ) {
    let alternativas = [...alternativas_erradas, alternativa_correcta];
    alternativas = alternativas.sort(function () {
      return Math.random() - 0.5;
    });
    return alternativas;
  }
  private retornar_alternativa_escogida() {
    let es_opcion_valida = false;
    let alternativa_escogida = "";
    //convertir a do while
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
    return alternativa_escogida;
  }
  //renombrar a comenzar_ronda
  public async comenzar_ronda(): Promise<number> {
    console.log("RONDA " + this.numero_ronda);
    const { pregunta, respuesta_correcta, respuestas_erradas } =
      await this.retornar_datos_pregunta_aleatoria();
    this.mostrar_pregunta(pregunta);
    const alternativas = this.retornar_alternativas_desordenadas(
      respuesta_correcta,
      respuestas_erradas
    );
    this.mostrar_alternativas(alternativas);
    //aqui
    const alternativa_escogida = this.retornar_alternativa_escogida();
    const premio = this.corroborar_alternativa_escogida(
      respuesta_correcta,
      alternativas,
      alternativa_escogida
    )
      ? this.premio
      : 0;
    return premio;
  }
}
