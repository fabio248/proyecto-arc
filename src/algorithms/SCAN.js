export default function scan(peticiones, head, diskSize, direccion)
{
    let posicionActual;
    let left = [], right = [];
    let seek_sequence = [];

    //Agregando valores de los extremos que serán recorridos
    if (direccion === "left")
        left.push(0);
    else if (direccion === "right")
        right.push(diskSize - 1);

    // Agregando peticiones que antes y despues de la posicion Inicia de lacabeza lectora.
    for (let i = 0; i < peticiones.length; i++)
    {
        if (peticiones[i] < head)
            left.push(peticiones[i]);
        if (peticiones[i] > head)
            right.push(peticiones[i]);
    }

    // Ordenando los vectores right y left
    left.sort(function(a, b){return a - b});
    right.sort(function(a, b){return a - b});

    // Recorre dos veces el ciclo segun la direccion seleccionada
    // agregando tanto las peticiones que se encuentran antes o
    // después de de la posicion actual de la cabeza lectora. 
    let run = 2;
    while (run-- >0)
    {
        if (direccion === "left")
        {
            for (let i = left.length - 1; i >= 0; i--)
            {
                posicionActual = left[i];

                // Agregando a arreglo del algoritmo Scan inferiores a la posicion Inicial
                seek_sequence.push(posicionActual);

                // Asignando nuevo posicion de la cabeza lectora
                head = posicionActual;
            }
            //Cambiando direccion
            direccion = "right";
        }
        else if (direccion === "right")
        {
            for (let i = 0; i < right.length; i++)
            {
                posicionActual = right[i];

                // Agregando a arreglo del algoritmo Scan superiores a la posicion Inicial
                seek_sequence.push(posicionActual);

                // Asignando nuevo posicion de la cabeza lectora
                head = posicionActual;
            }
            //Cambiando direccion
            direccion = "left";
        }
    }
    return seek_sequence;
}