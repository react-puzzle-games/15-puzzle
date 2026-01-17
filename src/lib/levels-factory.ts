import { randomSubarray, range, isSolvableFromNumbers } from "./utils";

/**
 * Generate a level of a given size
 * @param {Number} size The total size of the level, must be a perfect square
 * @returns {Object} TileSet object representing the level
 */
export default (size: number) => {
  if (!Number.isInteger(Math.sqrt(size))) {
    throw new Error(`Cannot generate level of size: <${size}>`);
  }

  if (size < 1 || size > 100) {
    throw new Error(`Cannot generate level of size: <${size}>`);
  }

  const gridSize = Math.sqrt(size);
  let tileSet: number[];

  // Keep generating until we get a solvable configuration
  do {
    tileSet = randomSubarray(range(size), size);
  } while (!isSolvableFromNumbers(tileSet, gridSize));

  return {
    tileSet,
  };
};
