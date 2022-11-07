function Clook(Q, IH, PH) {
  let n = Q.length,
    max_loc = 0,
    min_loc = 10000;

  let SeekTime = new Array(Q.length + 1);
  SeekTime[0] = '0';

  let Queue = new Array(Q.length + 1);
  Queue[0] = IH;

  let seek_time = 0,
    i,
    j,
    f = 0,
    d = 0;

  Q.sort((a, b) => a - b);
  min_loc = Q[0];
  max_loc = Q[n - 1];

  let visited = new Array(n + 1);

  if (PH <= IH) f = 0;
  else f = 1;

  for (i = 0; i < n; i++) {
    let pos = -1;
    let min = 10000;
    for (j = 0; j < n; j++) {
      if (d === 1) {
        if (Q[j] === IH) {
          pos = j;
          break;
        }
      } else {
        if (f === 0) {
          if (Q[j] > IH && min > Q[j] - IH && visited[j] === 0) {
            min = Q[j] - IH;
            pos = j;
          }
        } else if (f === 1) {
          if (Q[j] <= IH && min > IH - Q[j] && visited[j] === 0) {
            pos = j;
            min = IH - Q[j];
          }
        }
      }
    }
    if (pos === -1) {
      if (f === 0) {
        IH = min_loc;
        d = 1;
      } else {
        IH = max_loc;
        d = 1;
      }
      i--;
      continue;
    }
    visited[pos] = 1;
    if (d === 0) seek_time += Math.abs(Q[pos] - IH);
    else if (d === 1) d = 0;
    IH = Q[pos];
    Queue[i + 1] = Q[pos];
    SeekTime[i + 1] = seek_time + '';
  }
  return { Queue, SeekTime };
}

console.log(Clook([85, 8, 5, 45, 60, 66, 852], 50, 45));
