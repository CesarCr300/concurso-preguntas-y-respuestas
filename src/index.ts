import { connectDB } from "./baseDeDatos";
import { Juego } from "./clases/Juego";
connectDB(true).then(async () => {
    const juego = new Juego();
    juego.jugar();
});
