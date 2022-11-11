/**
 * @param arrayUnificado vector de  valores enteros con las peticiones
 * @return Devulve un vector con calculo de movimientos de un posicion a otra
 */
export function calculos(array, posInicial) {
  const calculo = [];
  let arrayUnificado = unificarArray(array, posInicial);
  for (let i = 0; i < arrayUnificado.length - 1; i++) {
    calculo.push({
      name: `${arrayUnificado[i]} --- ${arrayUnificado[i + 1]}`,
      cantidad: Math.abs(arrayUnificado[i] - arrayUnificado[i + 1]),
    });
  }
  calculo.push({
    name: 'Total movimientos',
    cantidad: calcularTotal(arrayUnificado),
  });
  calculo.push({
    name: 'Promedio movimientos',
    cantidad: calcularPromedio(arrayUnificado),
  });
  return calculo;
}
export function calculosScan(array, posInicial, totalPosiciones) {
  const calculo = [];
  let arrayUnificado = unificarArray(array, posInicial);
  for (let i = 0; i < arrayUnificado.length - 1; i++) {
    calculo.push({
      name: `${arrayUnificado[i]} --- ${arrayUnificado[i + 1]}`,
      cantidad: Math.abs(arrayUnificado[i] - arrayUnificado[i + 1]),
    });
  }
  calculo.push({
    name: 'Total movimientos',
    cantidad: calcularTotalScan(arrayUnificado, totalPosiciones),
  });
  calculo.push({
    name: 'Promedio movimientos',
    cantidad: calcularPromedioScan(arrayUnificado, totalPosiciones),
  });
  return calculo;
}

export function unificarArray(array, posInicial) {
  let arrayUnificado = [parseInt(posInicial)];
  array.map((item) => arrayUnificado.push(parseInt(item)));
  return arrayUnificado;
}

export function convertirStringAIntegerArray(array) {
  let arrayConvertido = [];
  array.map((item) => arrayConvertido.push(parseInt(item)));
  return arrayConvertido;
}

export function calcularPromedio(array) {
  let promedio = calcularTotal(array);
  return Math.round((promedio / (array.length - 1)) * 100) / 100;
}
export function calcularPromedioScan(array, totalPosiciones) {
  let promedio = calcularTotalScan(array, totalPosiciones);
  return Math.round((promedio / (array.length - 2)) * 100) / 100;
}
export function calcularTotal(array) {
  let total = 0;
  for (let index = 0; index < array.length - 1; index++) {
    total = total + Math.abs(array[index] - array[index + 1]);
  }
  return total;
}
export function calcularTotalScan(array, totalPosiciones) {
  let total = 0;
  for (let index = 0; index < array.length - 1; index++) {
    let calculo = Math.abs(array[index] - array[index + 1]);
    if (calculo !== totalPosiciones - 1) total = total + calculo;
  }
  return total;
}
