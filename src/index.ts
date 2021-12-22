import { connectDB } from "./baseDeDatos";
import { Juego } from "./controladores/Juego";
import { Consola } from "./vistas/consola";
async function inicio() {
  let nombreJugador = "";
  do {
    nombreJugador = Consola.retornar_nombre_jugador();
  } while (nombreJugador === "" || nombreJugador === null);
  if (typeof nombreJugador === "string") {
    const juego = new Juego(nombreJugador);
    await juego.jugar();
  }
}
connectDB().then(async () => {
  await inicio();
});
