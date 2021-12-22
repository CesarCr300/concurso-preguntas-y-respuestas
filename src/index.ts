import { connectDB } from "./baseDeDatos";
import { Juego } from "./clases/Juego";
connectDB().then(async () => {
    const juego = new Juego();
    juego.jugar();
});
