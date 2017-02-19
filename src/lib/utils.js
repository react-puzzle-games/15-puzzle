const range = length => {
  return Array.from({ length }, (v, i) => Number.parseInt(i, 10));
};

/**
 * Get random slice from an array based on Fisher Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
const randomSubarray = (arr, size) => {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
};

export default {
  range,
  randomSubarray
};
