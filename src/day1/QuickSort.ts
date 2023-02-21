
function partitioning(arr:number[], low: number, high: number): number {

  const pivot = arr[high];

  let idx = low - 1;

  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      idx++;
      // swap
      const tmp = arr[i];
       arr[i] = arr[idx];
       arr[idx] = tmp; 
    }
  }

  idx++;
  arr[high] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

function qs(arr:number[], low: number, high: number): void {
  if (low >= high) {
    return; 
  }

  const pivotIdx = partitioning(arr, low, high);

  qs(arr, low, pivotIdx - 1);
  qs(arr, pivotIdx + 1, high);

}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1)

}
