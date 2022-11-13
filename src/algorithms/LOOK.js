export default function look(peticiones, head, direccion) {
  let posicionActual;

  let left = [];
  let right = [];
  let seek_sequence = [];

  // Agregando peticiones que antes y despues de la posicion Inicia de lacabeza lectora.
  for (let i = 0; i < peticiones.length; i++) {
    if (peticiones[i] < head) left.push(peticiones[i]);
    if (peticiones[i] > head) right.push(peticiones[i]);
  }

  // Ordenando los vectores right y left
  left.sort(function (a, b) {
    return a - b;
  });
  right.sort(function (a, b) {
    return a - b;
  });

  // Recorre dos veces el ciclo segun la direccion seleccionada
  // agregando tanto las peticiones que se encuentran antes o
  // después de de la posicion actual de la cabeza lectora.
  let run = 2;
  while (run-- > 0) {
    if (direccion === 'Descendente') {
      for (let i = left.length - 1; i >= 0; i--) {
        posicionActual = left[i];
        // Agregando a arreglo del algoritmo Look inferiores a la posicion Inicial
        seek_sequence.push(posicionActual);
        // Asignando nuevo posicion de la cabeza lectora
        head = posicionActual;
      }
      //Cambiando direccion
      direccion = 'Ascendente';
    } else if (direccion === 'Ascendente') {
      for (let i = 0; i < right.length; i++) {
        posicionActual = right[i];
        // Agregando a arreglo del algoritmo Look superiores a la posicion Inicial
        seek_sequence.push(posicionActual);
        // Asignando nuevo posicion de la cabeza lectora
        head = posicionActual;
      }
      //Cambiando direccion
      direccion = 'Descendente';
    }
  }
  return seek_sequence;
}
