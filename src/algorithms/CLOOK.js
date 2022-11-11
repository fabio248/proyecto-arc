export default function clook(peticiones, head, direccion){
    let posicionActual;

    let left = [];
    let right = [];
    let seek_sequence = [];

    // Agregando peticiones que antes y despues de la posicion Inicia de lacabeza lectora.
    for(let i = 0; i < peticiones.length; i++)
    {
        if (peticiones[i] < head)
            left.push(peticiones[i]);
        if (peticiones[i] > head)
            right.push(peticiones[i]);
    }

    // Ordenando los vectores right y left
    left.sort(function(a, b){return a - b});
    right.sort(function(a, b){return a - b});

    // SERVIMOS ACORDE A DIRECCION DEL ALGORITMO
    if(direccion === "right")// ASCENDENTE
    {
      for(let i = 0; i < right.length; i++)
      {
          posicionActual = right[i];

          // Agregando a arreglo del algoritmo C-Look superiores a la posicion Inicial
          seek_sequence.push(posicionActual);

          // Asignando nuevo posicion de la cabeza lectora
          head = posicionActual;
      }

      // Luego servir todas peticiones superiores acorde al algoritmo
      // C-Look tenemos que iniciar la primera peticion y servimos ascendentemente 
      head = left[0];

      for(let i = 0; i < left.length; i++)
      {
          posicionActual = left[i];

          // Agregando a arreglo del algoritmo C-Look inferiores a la posicion Inicial
          seek_sequence.push(posicionActual);

          // Accessed track is now the new head
          head = posicionActual;
      }
    }
    else{ // DESCENTENTE
      for(let i = left.length-1; i >= 0; i--)
        {
            posicionActual = left[i];
            // Agregando a arreglo del algoritmo C - Look inferiores a la posicion Inicial
            seek_sequence.push(posicionActual);
            // Asignando nuevo posicion de la cabeza lectora
            head = posicionActual;
        }
        // Luego servir todas peticiones INFERIORES acorde al algoritmo
        // C-Look tenemos que iniciar la ULTIMA peticion y servimos descentemente
        head = right[right.length-1];

        for(let i = right.length-1; i >= 0; i--)
        {
            posicionActual = right[i];
            // Agregando a arreglo del algoritmo C - Look inferiores a la posicion Inicial
            seek_sequence.push(posicionActual);
            // Asignando nuevo posicion de la cabeza lectora
            head = posicionActual;
        }
    }
    return seek_sequence;
}
