import { Categoria } from "./Categoria";

const prompt = require("prompt-sync")();

export class Ronda {
  private numero_ronda: number;
  private premio: string="";
  constructor(numero: number) {
    this.numero_ronda = numero;
  }
  private async retornar_datos_pregunta_aleatoria() {
    const numeroPregunta: number = Math.floor(Math.random() * 4 + 1);
    const categoria = new Categoria(this.numero_ronda);
    this.premio = await categoria.retornar_premio();
    return await categoria.retornar_datos_pregunta(numeroPregunta);
  }
  private mostrar_pregunta(pregunta: string) {
    console.log(pregunta);
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
  private mostrar_alternativas(alternativas: string[]) {
    let i = 1;
    for (let alternativa of alternativas) {
      console.log(i + ") " + alternativa);
      i++;
    }
  }
  private retornar_alternativa_escogida() {
    let es_opcion_valida = false;
    let alternativa_escogida = "";
    while (!es_opcion_valida) {
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
    }
    return alternativa_escogida;
  }
  private corroborar_alternativa_escogida(
    respuesta_correcta: string,
    alternativas: string[],
    alternativa_escogida: string
  ): boolean {
    const posicion_alternativa_correcta =
      alternativas.indexOf(respuesta_correcta)+1;
    console.log("POSICION",posicion_alternativa_correcta);
    return posicion_alternativa_correcta.toString() == alternativa_escogida;
  }
  public async funcion_principal(): Promise<string> {
    const { pregunta, respuesta_correcta, respuestas_erradas } =
      await this.retornar_datos_pregunta_aleatoria();
    this.mostrar_pregunta(pregunta);
    const alternativas = this.retornar_alternativas_desordenadas(
      respuesta_correcta,
      respuestas_erradas
    );
    this.mostrar_alternativas(alternativas);
    const alternativa_escogida = this.retornar_alternativa_escogida();
    const premio = this.corroborar_alternativa_escogida(
      respuesta_correcta,
      alternativas,
      alternativa_escogida
    )?this.premio:"";
    return premio;
  }
}
