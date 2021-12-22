import { IPregunta } from "./Pregunta";
import { IRespuestaErrada } from "./RespuestaErrada";

export interface IPreguntaConRespuestas {
  pregunta: IPregunta;
  respuestas_erradas: IRespuestaErrada[];
}
