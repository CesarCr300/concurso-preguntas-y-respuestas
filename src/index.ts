import { connectDB } from "./baseDeDatos";
import { prompt } from "./util/prompt";
import { Juego } from "./clases/Juego";
connectDB().then(async () => {
  const nombreJugador = prompt("Ingrese el nombre del jugador: ");
  const juego = new Juego(nombreJugador);
  juego.jugar();
});
//index->juego->inicializa el jugador->rondas
