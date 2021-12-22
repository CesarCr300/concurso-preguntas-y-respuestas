import { CategoriaServicio } from "../servicios/Categoria";
import { Pregunta } from "./Pregunta";
const CategoriaModelo = new CategoriaServicio();

export class Categoria {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
  async retornar_datos_pregunta(idPregunta:number) {
      const pregunta = new Pregunta(idPregunta);
      return await pregunta.obtenerDatos();
  }
  async retornar_premio(){
      const instancia = await CategoriaModelo.getById(this.id);
      return instancia.premio;
  }
}
