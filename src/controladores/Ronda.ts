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
  public retornar_premio(
    respuesta_correcta: string,
    alternativas: string[],
    alternativa_escogida: string
  ) {
    return this.corroborar_alternativa_escogida(
      respuesta_correcta,
      alternativas,
      alternativa_escogida
    )
      ? this.premio
      : 0;
  }
  //creacion instancias
  private async crear_instancia_categoria() {
    return await RondaModelo.relacionar_con_categoria(
      this.numero_ronda,
      this.instancia
    );
  }
  //retornar datos
  private async retornar_datos_pregunta_aleatoria() {
    const numeroPregunta: number = Math.floor(Math.random() * 4 + 1);
    const instanciaCategoria = await this.crear_instancia_categoria();
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
  public async retornar_datos() {
    const { pregunta, respuesta_correcta, respuestas_erradas } =
      await this.retornar_datos_pregunta_aleatoria();
    const alternativas = this.retornar_alternativas_desordenadas(
      respuesta_correcta,
      respuestas_erradas
    );
    return { pregunta, respuesta_correcta, alternativas };
  }
}
