export async function timeout(tiempo_milisegundos: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, tiempo_milisegundos));
}
