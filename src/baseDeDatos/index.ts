import { db } from "./models/index";

export async function connectDB(force: boolean = false) {
  await db.sequelize.sync({ force });
  if (force) {
    const CategoriaModelo = db.Categoria;
    const PreguntaModelo = db.Pregunta;
    const RespuestaErrada = db.RespuestaErrada;
    interface ICategoria {
      nombre: string;
      nivel_dificultad: number;
      premio: string;
    }
    interface IPregunta {
      pregunta: string;
      respuesta_correcta: string;
    }
    interface IRespuestaErrada {
      respuesta_errada: string;
    }
    interface IPreguntaConRespuestas {
      pregunta: IPregunta;
      respuestas_erradas: IRespuestaErrada[];
    }

    async function crearCategoriaConPreguntas(
      categoria: ICategoria,
      preguntas: IPreguntaConRespuestas[]
    ) {
      const instancia = await CategoriaModelo.create(categoria);
      for (let i = 0; i < preguntas.length; i++) {
        const pregunta_extraida = preguntas[i].pregunta;
        const respuestas_erradas = preguntas[i].respuestas_erradas;
        const pregunta = await PreguntaModelo.create(pregunta_extraida);
        await instancia.addPregunta(pregunta);
        for (let j = 0; j < respuestas_erradas.length; j++) {
          const respuesta_errada = await RespuestaErrada.create(
            respuestas_erradas[j]
          );
          await pregunta.addRespuestaErrada(respuesta_errada);
        }
      }
    }
    await crearCategoriaConPreguntas(
      {
        nombre: "Matemática básica",
        nivel_dificultad: 1,
        premio: "calculadora básica",
      },
      [
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 3*3/2?",
            respuesta_correcta: "4.5",
          },
          respuestas_erradas: [
            { respuesta_errada: "3" },
            { respuesta_errada: "2.5" },
            { respuesta_errada: "4.4" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 2*5/2?",
            respuesta_correcta: "5",
          },
          respuestas_erradas: [
            { respuesta_errada: "4" },
            { respuesta_errada: "5.2" },
            { respuesta_errada: "4.9" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 1+3?",
            respuesta_correcta: "4",
          },
          respuestas_erradas: [
            { respuesta_errada: "3" },
            { respuesta_errada: "1" },
            { respuesta_errada: "5" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 3+4*2?",
            respuesta_correcta: "11",
          },
          respuestas_erradas: [
            { respuesta_errada: "14" },
            { respuesta_errada: "10" },
            { respuesta_errada: "13" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 100+1?",
            respuesta_correcta: "101",
          },
          respuestas_erradas: [
            { respuesta_errada: "102" },
            { respuesta_errada: "99" },
            { respuesta_errada: "110" },
          ],
        },
      ]
    );
    await crearCategoriaConPreguntas(
      {
        nombre: "Matemática intermedias",
        nivel_dificultad: 2,
        premio: "calculadora cientifica",
      },
      [
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 5^2?",
            respuesta_correcta: "25",
          },
          respuestas_erradas: [
            { respuesta_errada: "4" },
            { respuesta_errada: "9" },
            { respuesta_errada: "36" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 13^2?",
            respuesta_correcta: "169",
          },
          respuestas_erradas: [
            { respuesta_errada: "168" },
            { respuesta_errada: "81" },
            { respuesta_errada: "144" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de (4+5)^2?",
            respuesta_correcta: "81",
          },
          respuestas_erradas: [
            { respuesta_errada: "18" },
            { respuesta_errada: "80" },
            { respuesta_errada: "100" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de (3+4)*2^2?",
            respuesta_correcta: "28",
          },
          respuestas_erradas: [
            { respuesta_errada: "196" },
            { respuesta_errada: "200" },
            { respuesta_errada: "27" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de (10)*2^2?",
            respuesta_correcta: "40",
          },
          respuestas_erradas: [
            { respuesta_errada: "400" },
            { respuesta_errada: "20" },
            { respuesta_errada: "300" },
          ],
        },
      ]
    );
    await crearCategoriaConPreguntas(
      {
        nombre: "Matemática pre-avanzadas",
        nivel_dificultad: 3,
        premio: "Libro pre-universitario",
      },
      [
        {
          pregunta: {
            pregunta: "¿Cual es la raíz cuadrada del residuo de 5/2?",
            respuesta_correcta: "1",
          },
          respuestas_erradas: [
            { respuesta_errada: "2.5" },
            { respuesta_errada: "5" },
            { respuesta_errada: "3" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual el la raíz cúbica de 81/3?",
            respuesta_correcta: "3",
          },
          respuestas_erradas: [
            { respuesta_errada: "27" },
            { respuesta_errada: "9" },
            { respuesta_errada: "4" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 3!?",
            respuesta_correcta: "6",
          },
          respuestas_erradas: [
            { respuesta_errada: "2" },
            { respuesta_errada: "1" },
            { respuesta_errada: "0" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es el resultado de 4!?",
            respuesta_correcta: "24",
          },
          respuestas_erradas: [
            { respuesta_errada: "6" },
            { respuesta_errada: "2" },
            { respuesta_errada: "1" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la mitad del cociente de 20/3?",
            respuesta_correcta: "3",
          },
          respuestas_erradas: [
            { respuesta_errada: "1" },
            { respuesta_errada: "2" },
            { respuesta_errada: "8" },
          ],
        },
      ]
    );
    await crearCategoriaConPreguntas(
      {
        nombre: "Matemática avanzada - Derivadas",
        nivel_dificultad: 4,
        premio: "calculadora gráfica",
      },
      [
        {
          pregunta: {
            pregunta: "¿Cual es la derivada de x^2?",
            respuesta_correcta: "2x",
          },
          respuestas_erradas: [
            { respuesta_errada: "2x^2" },
            { respuesta_errada: "(x^3)/3" },
            { respuesta_errada: "6x" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la derivada de 2x^2?",
            respuesta_correcta: "4x",
          },
          respuestas_erradas: [
            { respuesta_errada: "6x" },
            { respuesta_errada: "2x^2" },
            { respuesta_errada: "8x" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la derivada de x^3?",
            respuesta_correcta: "3x^2",
          },
          respuestas_erradas: [
            { respuesta_errada: "6x" },
            { respuesta_errada: "x^2" },
            { respuesta_errada: "x^3" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la derivada de 4x^9?",
            respuesta_correcta: "36x^8",
          },
          respuestas_erradas: [
            { respuesta_errada: "32x^8" },
            { respuesta_errada: "36x^9" },
            { respuesta_errada: "13x^5" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la derivada de 10x^5?",
            respuesta_correcta: "50x^4",
          },
          respuestas_erradas: [
            { respuesta_errada: "50x^5" },
            { respuesta_errada: "10x^4" },
            { respuesta_errada: "12x^3" },
          ],
        },
      ]
    );
    await crearCategoriaConPreguntas(
      {
        nombre: "Matemática avanzada - Integrales",
        nivel_dificultad: 5,
        premio: "libro de calculo integral",
      },
      [
        {
          pregunta: {
            pregunta: "¿Cual es la integral de 2x?",
            respuesta_correcta: "x^2 + c",
          },
          respuestas_erradas: [
            { respuesta_errada: "x^2" },
            { respuesta_errada: "2x^2" },
            { respuesta_errada: "3x" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la integral de x^(-1)?",
            respuesta_correcta: "ln|x| + c",
          },
          respuestas_erradas: [
            { respuesta_errada: "ln|x|" },
            { respuesta_errada: "-1" },
            { respuesta_errada: "-x^(-1)" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la integral de 1?",
            respuesta_correcta: "x + c",
          },
          respuestas_erradas: [
            { respuesta_errada: "x" },
            { respuesta_errada: "3x" },
            { respuesta_errada: "x^2" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la integral de 3x^2?",
            respuesta_correcta: "x^3 + c",
          },
          respuestas_erradas: [
            { respuesta_errada: "3x^2" },
            { respuesta_errada: "x^2" },
            { respuesta_errada: "x^3" },
          ],
        },
        {
          pregunta: {
            pregunta: "¿Cual es la integral de 10x^9?",
            respuesta_correcta: "x^10 + c",
          },
          respuestas_erradas: [
            { respuesta_errada: "x^10" },
            { respuesta_errada: "10x^9 + c" },
            { respuesta_errada: "90x + c" },
          ],
        },
      ]
    );
  }
}
