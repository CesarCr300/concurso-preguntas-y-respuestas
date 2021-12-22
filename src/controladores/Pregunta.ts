import { PreguntaServicio } from "../servicios/Pregunta";

const PreguntaModelo = new PreguntaServicio();

export class Pregunta {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  public async obtener_datos() {
    const pregunta = await PreguntaModelo.obtener_por_id(this.id);
    const objetos_respuestas_erradas =
      await PreguntaModelo.obtener_respuestas_erradas(pregunta);
    const respuestas_erradas: string[] = [];
    for (let objeto_respuesta_errada of objetos_respuestas_erradas) {
      respuestas_erradas.push(objeto_respuesta_errada.respuesta_errada);
    }
    return {
      pregunta: pregunta.pregunta as string,
      respuesta_correcta: pregunta.respuesta_correcta as string,
      respuestas_erradas,
    };
  }
}