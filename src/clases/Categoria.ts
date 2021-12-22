import { CategoriaServicio } from "../servicios/Categoria";
import { Pregunta } from "./Pregunta";
const CategoriaModelo = new CategoriaServicio();

export class Categoria {
  id: number;
  instancia: any;
  constructor(id: number, instancia: any) {
    this.id = id;
    this.instancia = instancia;
  }
  // async establecer_instancia() {
  //   this.instancia = await CategoriaModelo.obtener_por_id(this.id);
  // }
  async retornar_datos_pregunta(numeroPregunta: number) {
    const preguntas = await CategoriaModelo.obtener_preguntas(this.instancia);
    const preguntaId = preguntas[numeroPregunta].id;
    const pregunta = new Pregunta(preguntaId);
    return await pregunta.obtener_datos();
  }
  async retornar_premio() {
    const instancia = await CategoriaModelo.obtener_por_id(this.id);
    return instancia.premio;
  }
}
