export default function two_crystal_balls(breaks: boolean[]): number {

  const distance = breaks.length;
  const step = Math.floor(Math.sqrt(distance));

  let i = step;
  for (; i < distance; i+=step) {
    if (breaks[i]) {
      break;
    }
  }

  i -= step;
  for (let j = 0; j <= step && i < distance; ++i, ++i) {
    if (breaks[i]) {
      return i;
    }
  }
  return -1;
}
