/**
 * Get random slice from an array based on Fisher Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export default (arr, size) => {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
}
