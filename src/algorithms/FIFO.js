export default function fifo(peticiones, posicionInicial) {
  const arreglo = [{ name: 'peticion 0', element: posicionInicial }];
  peticiones.forEach((element, index) => {
    arreglo.push({ name: 'petición ' + (index + 1), element });
  });
  return arreglo;
}
