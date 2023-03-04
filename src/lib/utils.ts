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
