/**
 * Return an Array containing all numbers such that 0 = n <= length in
 * ascending order.
 * @param {Number} length Number of items in the resulting Array
 * @returns {Array} Array of numbers
 */
export const range = length => {
  return Array.from({ length }, (v, i) => Number.parseInt(i + 1, 10));
};

/**
 * Get random slice from an array based on Fisher Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array} arr Input Array
 * @param {Number} size Slice size
 * @returns {Array} Resulting slice
 */
export const randomSubarray = (arr, size) => {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
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
 * @return {Object} Object containing coordinates
 */
export const getTileCoords = (index, gridSize, tileSize) => {
  if (!Number.isInteger(gridSize) || gridSize < 1) {
    throw new Error(`Cannot get coords from tile with gridSize: <${gridSize}>`);
  }

  if (!Number.isInteger(tileSize) || tileSize < 1) {
    throw new Error(`Cannot get coords from tile with tileSize: <${tileSize}>`);
  }

  const column = index % gridSize;
  const row = index / gridSize << 0;

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
 * @param  {Object} tileACoords Coordinates of Tile A
 * @param  {Object} tileBCoords Coordinates of Tile B
 * @returns {Object} Result
 */
export const distanceBetween = (tileACoords, tileBCoords) => {
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

export const invert = (arr, indexA, indexB, fields) => {
  fields.forEach(field => {
    const sw = arr[indexA][field];
    arr[indexA][field] = arr[indexB][field];
    arr[indexB][field] = sw;
  });
};
