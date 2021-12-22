import { connectDB } from "./baseDeDatos";
import { prompt } from "./util/prompt";
import { Juego } from "./controladores/Juego";
async function inicio() {
  let nombreJugador = "";
  do {
    nombreJugador = prompt("Ingrese el nombre del jugador: ");
  } while (nombreJugador === "" || nombreJugador === null);
  if (typeof nombreJugador === "string") {
    const juego = new Juego(nombreJugador);
    await juego.jugar();
  }
}
connectDB().then(async () => {
  await inicio();
});
