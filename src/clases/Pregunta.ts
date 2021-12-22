import {PreguntaServicio} from '../servicios/Pregunta'

const PreguntaModelo = new PreguntaServicio();

interface IDatosPregunta {
    pregunta: string,
    respuesta_correcta: string,
    respuestas_erradas: any
}

export class Pregunta {
    id:number;
    constructor(id:number){
        this.id = id;
    }
    public async obtenerDatos(){
        const pregunta = await  PreguntaModelo.getById(this.id);
        const objetos_respuestas_erradas = await PreguntaModelo.obtenerRespuestasErradas(pregunta);
        const respuestas_erradas:string[] = []
        for (let objeto_respuesta_errada of objetos_respuestas_erradas){
            respuestas_erradas.push(objeto_respuesta_errada.respuesta_errada)
        }
        return {pregunta:pregunta.pregunta, respuesta_correcta:pregunta.respuesta_correcta,respuestas_erradas} as IDatosPregunta;
    }
}