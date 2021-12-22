import { Categoria } from "./Categoria";
import { RondaServicio } from "../servicios/Ronda";

const RondaModelo = new RondaServicio();
export class Ronda {
  //analizar nombre de ronda
  private numeroRonda: number;
  private premio: number = 0;
  private instancia: any;
  constructor(numeroRonda: number, instancia: any) {
    this.numeroRonda = numeroRonda;
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
      this.numeroRonda,
      this.instancia
    );
  }
  //retornar datos
  private async retornar_datos_pregunta_aleatoria() {
    const numeroPregunta: number = Math.floor(Math.random() * 4 + 1);
    const instanciaCategoria = await this.crear_instancia_categoria();
    const categoria = new Categoria(this.numeroRonda, instanciaCategoria);
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
    const { pregunta, respuestaCorrecta, respuestasErradas } =
      await this.retornar_datos_pregunta_aleatoria();
    const alternativas = this.retornar_alternativas_desordenadas(
      respuestaCorrecta,
      respuestasErradas
    );
    return { pregunta, respuestaCorrecta, alternativas };
  }
}
