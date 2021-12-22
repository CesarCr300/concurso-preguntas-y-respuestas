import { connectDB } from "./baseDeDatos";
import { Ronda } from "./clases/Ronda";
connectDB(false).then(async () => {
    const ronda1 = new Ronda(1);
    const resultado = await ronda1.funcion_principal();
    console.log(resultado);
});
