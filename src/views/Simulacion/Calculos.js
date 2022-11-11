/**
 * @param pet vector con las peticiones
 * @return Devulve un vector con calculo de movimientos de un posicion a otra
 */
export function calculos(array, posInicial) {
  const calculo = [];
  const pet = unificarArray(array, posInicial);
  for (let i = 0; i < pet.length - 1; i++) {
    calculo.push({
      name: `${pet[i]} --- ${pet[i + 1]}`,
      cantidad: Math.abs(pet[i] - pet[i + 1]),
    });
  }
  calculo.push({
    name: 'Total movimientos',
    cantidad: calcularTotal(array, posInicial),
  });
  calculo.push({
    name: 'Promedio movimientos',
    cantidad: calcularPromedio(array, posInicial),
  });
  return calculo;
}

export function unificarArray(array, posInicial) {
  const arrayUnificado = [parseInt(posInicial)];
  array.map((item) => arrayUnificado.push(parseInt(item)));
  return arrayUnificado;
}

export function calcularPromedio(array, posInicial) {
  let promedio = calcularTotal(array, posInicial);
  return Math.round(promedio / array.length);
}

export function calcularTotal(array, posInicial) {
  const arrayUnificado = unificarArray(array, posInicial);
  let total = 0;
  for (let index = 0; index < arrayUnificado.length - 1; index++) {
    total = total + Math.abs(arrayUnificado[index] - arrayUnificado[index + 1]);
  }
  return total;
}
