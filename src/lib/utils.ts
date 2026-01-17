import { TileAdjancency, TileDescriptor } from "./common-types";

/**
 * Return an Array containing all numbers such that 0 = n <= length in
 * ascending order.
 * @param {Number} length Number of items in the resulting Array
 * @returns {Array} Array of numbers
 */
export const range = (length: number) => {
  return Array.from({ length }, (_, i: number) => i + 1);
};

/**
 * Get random slice from an array based on Fisher Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array} arr Input Array
 * @param {Number} size Slice size
 * @returns {Array} Resulting slice
 */
export const randomSubarray = (arr: number[], size: number) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
};

/**
 * Returns an Object containing grid coordinates based on the index
 * in an Array.
 * @param {Number} index Position of an item in an Array
 * @param {Number} gridSize Size of the Grid
 * @param {Number} tileSize Size of a Tile, in pixels, to calculate the absolute
 * positioning within the Grid
 * @return {TileDescriptor} Object containing coordinates
 */
export const getTileCoords = (
  index: number,
  gridSize: number,
  tileSize: number
): TileDescriptor => {
  if (!Number.isInteger(gridSize) || gridSize < 1) {
    throw new Error(`Cannot get coords from tile with gridSize: <${gridSize}>`);
  }

  if (!Number.isInteger(tileSize) || tileSize < 1) {
    throw new Error(`Cannot get coords from tile with tileSize: <${tileSize}>`);
  }

  const column = index % gridSize;
  const row = (index / gridSize) << 0;

  return {
    column,
    row,
    left: column * tileSize,
    top: row * tileSize,
    tileId: index,
  };
};

/**
 * Calculate distance between two sets of coordinates
 *
 * @param  {TileDescriptor} tileACoords Coordinates of Tile A
 * @param  {TileDescriptor} tileBCoords Coordinates of Tile B
 * @returns {TileAdjancency} Result
 */
export const distanceBetween = (
  tileACoords: TileDescriptor,
  tileBCoords: TileDescriptor
): TileAdjancency => {
  const sameRow = tileACoords.row === tileBCoords.row;
  const sameColumn = tileACoords.column === tileBCoords.column;
  const columnDiff = tileACoords.column - tileBCoords.column;
  const rowDiff = tileACoords.row - tileBCoords.row;
  const diffColumn = Math.abs(columnDiff) === 1;
  const diffRow = Math.abs(rowDiff) === 1;
  const sameRowDiffColumn = sameRow && diffColumn;
  const sameColumnDiffRow = sameColumn && diffRow;

  return {
    neighbours: sameRowDiffColumn || sameColumnDiffRow,
    distance: {
      rows: rowDiff,
      columns: columnDiff,
    },
  };
};

/**
 * Swap values of given field(s) from an array of objects given two indexes.
 * @param arr
 * @param indexA
 * @param indexB
 * @param fields
 */
export const invert = (
  arr: { [x: number]: { [x: string]: unknown } },
  indexA: number,
  indexB: number,
  fields: string[]
) => {
  fields.forEach((field) => {
    const sw = arr[indexA][field];
    arr[indexA][field] = arr[indexB][field];
    arr[indexB][field] = sw;
  });
};

/**
 * Check if a puzzle configuration is solvable from an array of numbers.
 * For a 15-puzzle (4x4 grid), a configuration is solvable if:
 * - The blank is on an even row (counting from bottom) and inversions is odd, OR
 * - The blank is on an odd row (counting from bottom) and inversions is even
 *
 * An inversion is a pair of tiles where a higher-numbered tile appears
 * before a lower-numbered tile in row-major order (excluding the blank).
 *
 * @param numbers Array of numbers representing the puzzle state
 * @param gridSize Size of the grid (e.g., 4 for a 4x4 grid)
 * @returns {boolean} True if the puzzle is solvable, false otherwise
 */
export const isSolvableFromNumbers = (
  numbers: number[],
  gridSize: number
): boolean => {
  // Find the blank tile (number === gridSize * gridSize)
  const blankValue = gridSize * gridSize;
  const blankIndex = numbers.indexOf(blankValue);

  // Calculate the row of the blank tile from the bottom (1-indexed)
  const blankRow = Math.floor(blankIndex / gridSize);
  const blankRowFromBottom = gridSize - blankRow;

  // Count inversions (excluding the blank tile)
  let inversions = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === blankValue) continue;

    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[j] === blankValue) continue;

      if (numbers[i] > numbers[j]) {
        inversions++;
      }
    }
  }

  // For a 4x4 grid (15-puzzle):
  // If blank is on an even row from bottom, inversions must be odd
  // If blank is on an odd row from bottom, inversions must be even
  if (blankRowFromBottom % 2 === 0) {
    return inversions % 2 === 1;
  } else {
    return inversions % 2 === 0;
  }
};

/**
 * Check if a puzzle configuration is solvable.
 * For a 15-puzzle (4x4 grid), a configuration is solvable if:
 * - The blank is on an even row (counting from bottom) and inversions is odd, OR
 * - The blank is on an odd row (counting from bottom) and inversions is even
 *
 * An inversion is a pair of tiles where a higher-numbered tile appears
 * before a lower-numbered tile in row-major order (excluding the blank).
 *
 * @param tiles Array of tile descriptors
 * @param gridSize Size of the grid (e.g., 4 for a 4x4 grid)
 * @returns {boolean} True if the puzzle is solvable, false otherwise
 */
export const isSolvable = (
  tiles: TileDescriptor[],
  gridSize: number
): boolean => {
  // Get the numbers in row-major order
  const numbers = tiles.map(tile => tile.number!); // Use non-null assertion since we know tiles have numbers in the game
  return isSolvableFromNumbers(numbers, gridSize);
};
