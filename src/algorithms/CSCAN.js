export default function cscan(peticiones, head, diskSize, direccion) {
  let posicionActual;
  let left = [],
    right = [];
  let seek_sequence = [];

  //Agregando valores de los extremos que serán recorridos
  left.push(0);
  right.push(diskSize - 1);

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

  // SERVIMOS ACORDE A DIRECCION DEL ALGORITMO
  if (direccion === 'Ascendente') {
    //ASCENDENTE
    for (let i = 0; i < right.length; i++) {
      posicionActual = right[i];

      // Agregando a arreglo del algoritmo C-Look superiores a la posicion Inicial
      seek_sequence.push(posicionActual);

      // Asignando nuevo posicion de la cabeza lectora
      head = posicionActual;
    }

    // Luego servir todas peticiones superiores lleganod al extremo final del disco acorde al
    // algoritmo Scan tenemos que iniciar la primera peticion que seria el extremo 0 inicial
    // y servimos ascendentemente
    head = 0;

    // Now service the requests again
    // which are left.
    for (let i = 0; i < left.length; i++) {
      posicionActual = left[i];

      // appending current track to seek sequence
      seek_sequence.push(posicionActual);

      // accessed track is now the new head
      head = posicionActual;
    }
  } else {
    // DESCENDENTE
    for (let i = left.length - 1; i >= 0; i--) {
      posicionActual = left[i];
      // Agregando a arreglo del algoritmo C - Scan inferiores a la posicion Inicial
      seek_sequence.push(posicionActual);
      // Asignando nuevo posicion de la cabeza lectora
      head = posicionActual;
    }
    // Luego servir todas peticiones INFERIORES llegando al extremo 0 acorde al algoritmo
    // C- Scan tenemos que iniciar la ULTIMA peticion disponible en el disco y servimos descentemente
    head = diskSize - 1;

    for (let i = right.length - 1; i >= 0; i--) {
      posicionActual = right[i];
      // Agregando a arreglo del algoritmo C - Scan inferiores a la posicion Inicial
      seek_sequence.push(posicionActual);
      // Asignando nuevo posicion de la cabeza lectora
      head = posicionActual;
    }
  }
  return seek_sequence;
}
