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
    respuestaCorrecta: string,
    alternativas: string[],
    alternativaEscogida: string
  ): boolean {
    const posicionAlternativaCorrecta =
      alternativas.indexOf(respuestaCorrecta) + 1;
    return posicionAlternativaCorrecta.toString() == alternativaEscogida;
  }
  public retornar_premio(
    respuestaCorrecta: string,
    alternativas: string[],
    alternativaEscogida: string
  ) {
    return this.corroborar_alternativa_escogida(
      respuestaCorrecta,
      alternativas,
      alternativaEscogida
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
    alternativaCorrecta: string,
    alternativaErradas: string[]
  ) {
    let alternativas = [...alternativaErradas, alternativaCorrecta];
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
