export default function bs_list(haystack: number[], needle: number): boolean {

  let low = 0
  let high = haystack.length

  do {
    let middle = Math.floor(low + (high - low) / 2);
    let value = haystack[middle];

    if (value === needle) {
      return true;
    } else if (needle > value) {
      low = middle + 1;
    } else {
      high = middle;
    }
  } while (low < high) 
  return false;

}
