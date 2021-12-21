import {db} from '../models/index';

const CategoriaModelo = db.Categoria;

async function create(){
    const categoria1 = await CategoriaModelo.create({nombre:"Matemática básica",nivel_dificultad:1,premio:"calculadora básica"})
    await categoria1.addPregunta({pregunta:"¿Cual es el resultado de 3*3/2?", respuesta_correcta:"4.5"})
}
