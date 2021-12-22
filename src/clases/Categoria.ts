import { CategoriaServicio } from "../servicios/Categoria";
import { Pregunta } from "./Pregunta";
const CategoriaModelo = new CategoriaServicio();

export class Categoria {
  id: number;
  instancia?: any;
  constructor(id: number) {
    this.id = id;
  }
  async establecer_instancia() {
    this.instancia = await CategoriaModelo.getById(this.id);
  }
  async retornar_datos_pregunta(numeroPregunta: number) {
    const preguntas = await CategoriaModelo.obtenerPreguntas(this.instancia);
    const preguntaId = preguntas[numeroPregunta].id;
    const pregunta = new Pregunta(preguntaId);
    return await pregunta.obtenerDatos();
  }
  async retornar_premio() {
    const instancia = await CategoriaModelo.getById(this.id);
    return instancia.premio;
  }
}
