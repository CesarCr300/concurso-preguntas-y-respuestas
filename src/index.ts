import { connectDB } from "./baseDeDatos";
import { prompt } from "./util/prompt";
import { Juego } from "./clases/Juego";
connectDB().then(async () => {
  let nombreJugador = "";
  do {
    nombreJugador = prompt("Ingrese el nombre del jugador: ");
  } while (nombreJugador === "");
  if (nombreJugador !== null) {
    const juego = new Juego(nombreJugador);
    juego.jugar();
    console.log("JUEGO FINALIZADO");
  } else {
    console.log("JUEGO FINALIZADO");
  }
});
