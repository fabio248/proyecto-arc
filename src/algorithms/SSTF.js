export default function sstf(peticiones, head){
    let distance, min;

    let seek_sequence = [];
    let sstf = peticiones;
    
    let ii = -1;
    // Ciclo para encontrar distancia más cortas para cada peticion
    for (let i = 0; i < peticiones.length; i++ ){
        min = 90000000;
        ii = i;
        // Se registra compara cada peticion con peticion actual
        for (let j = i; j < peticiones.length; j++){
            distance = Math.abs(head - sstf[j]);
            if(distance < min){
                ii = j;
                min = distance;
            }
        }
        // Se ocupa una variale temporal para almacenar los valores del arreglo
        // y continuar las comaraciones correspondientes
        let temp = sstf[i];
        sstf[i] = sstf[ii];
        sstf[ii] = temp;
        // Se actualiza la posicion actual de la cabeza lectora.
        head = sstf[i];
    }
    // Se ingresa el arreglo acorde al algoritmo SSTF
    for(let index = 0; index < sstf.length; index++){
        seek_sequence.push(sstf[index]);
    }
    return seek_sequence;
}