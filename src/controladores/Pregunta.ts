import { PreguntaServicio } from "../servicios/Pregunta";

const PreguntaModelo = new PreguntaServicio();

export class Pregunta {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  public async obtener_datos() {
    const pregunta = await PreguntaModelo.obtener_por_id(this.id);
    const objetosRespuestasErradas =
      await PreguntaModelo.obtener_respuestas_erradas(pregunta);
    const respuestasErradas: string[] = [];
    for (let objetoRespuestaErrada of objetosRespuestasErradas) {
      respuestasErradas.push(objetoRespuestaErrada.respuesta_errada);
    }
    return {
      pregunta: pregunta.pregunta as string,
      respuestaCorrecta: pregunta.respuesta_correcta as string,
      respuestasErradas,
    };
  }
}
