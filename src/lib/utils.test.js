// @ts-check

import * as utils from './utils';

describe('distanceBetween', () => {
  it('should find two adjacent tiles to be neighbours', () => {
    const tileA = {
      row: 0,
      column: 0,
    };
    const tileB = {
      row: 0,
      column: 1,
    };

    expect(utils.distanceBetween(tileA, tileB).neighbours).toBe(true);
  });

  it('should find two non-adjacent tiles to not be neighbours', () => {
    const tileA = {
      row: 0,
      column: 0,
    };
    const tileB = {
      row: 0,
      column: 3,
    };

    expect(utils.distanceBetween(tileA, tileB).neighbours).toBe(false);
  });

  it('should find two diagonally adjacent tiles to not be neighbours', () => {
    const tileA = {
      row: 0,
      column: 0,
    };
    const tileB = {
      row: 1,
      column: 1,
    };

    expect(utils.distanceBetween(tileA, tileB).neighbours).toBe(false);
  });
});

describe('isSolvableFromNumbers', () => {
  const gridSize = 4;

  it('should detect the solved state as solvable', () => {
    const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    expect(utils.isSolvableFromNumbers(solvedState, gridSize)).toBe(true);
  });

  it('should detect a solvable configuration (even inversions, blank on odd row from bottom)', () => {
    // This configuration has 0 inversions (even) and blank is on row 4 from bottom (odd)
    // Row 0 from top = Row 4 from bottom in a 4x4 grid
    const solvableState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15];
    expect(utils.isSolvableFromNumbers(solvableState, gridSize)).toBe(true);
  });

  it('should detect a solvable configuration (odd inversions, blank on even row from bottom)', () => {
    // Blank at position 11: row = floor(11/4) = 2, rowFromBottom = 4-2 = 2 (even)
    // Exactly 1 inversion: 2 > 1 (odd inversions)
    // Rule: even row from bottom + odd inversions = solvable
    const solvableState = [2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 12, 13, 14, 15];
    expect(utils.isSolvableFromNumbers(solvableState, gridSize)).toBe(true);
  });

  it('should detect an unsolvable configuration (odd inversions, blank on odd row from bottom)', () => {
    // Blank at position 15 (row 3 from top, row 1 from bottom = odd)
    // Exactly 1 inversion: 15 > 14 (odd inversions)
    // Rule: odd row from bottom + odd inversions = unsolvable
    const unsolvableState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 16];
    expect(utils.isSolvableFromNumbers(unsolvableState, gridSize)).toBe(false);
  });

  it('should detect an unsolvable configuration (even inversions, blank on even row from bottom)', () => {
    // Blank at position 11 (row 2 from top, row 2 from bottom = even)
    // 0 inversions (even)
    // Rule: even row from bottom + even inversions = unsolvable
    const unsolvableState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 12, 13, 14, 15];
    expect(utils.isSolvableFromNumbers(unsolvableState, gridSize)).toBe(false);
  });

  it('should handle blank tile in different positions correctly', () => {
    // Blank at position 0 (row 0 from top, row 4 from bottom = even from bottom)
    // Exactly 1 inversion: 2 > 1 (odd inversions)
    // Rule: even row from bottom + odd inversions = solvable
    const state = [16, 2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(utils.isSolvableFromNumbers(state, gridSize)).toBe(true);
  });

  it('should correctly count inversions excluding the blank tile', () => {
    // Blank at position 11 (row 2 from top, row 2 from bottom = even)
    // Exactly 1 inversion: 2 > 1 (odd inversions)
    // Rule: even row from bottom + odd inversions = solvable
    const state = [2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 12, 13, 14, 15];
    expect(utils.isSolvableFromNumbers(state, gridSize)).toBe(true);
  });
});

describe('isSolvable', () => {
  const gridSize = 4;
  const tileSize = 100;

  it('should detect solvable tile configurations', () => {
    const tiles = [
      { tileId: 0, number: 1, row: 0, column: 0, left: 0, top: 0, width: tileSize, height: tileSize },
      { tileId: 1, number: 2, row: 0, column: 1, left: tileSize, top: 0, width: tileSize, height: tileSize },
      { tileId: 2, number: 3, row: 0, column: 2, left: tileSize * 2, top: 0, width: tileSize, height: tileSize },
      { tileId: 3, number: 4, row: 0, column: 3, left: tileSize * 3, top: 0, width: tileSize, height: tileSize },
      { tileId: 4, number: 5, row: 1, column: 0, left: 0, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 5, number: 6, row: 1, column: 1, left: tileSize, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 6, number: 7, row: 1, column: 2, left: tileSize * 2, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 7, number: 8, row: 1, column: 3, left: tileSize * 3, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 8, number: 9, row: 2, column: 0, left: 0, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 9, number: 10, row: 2, column: 1, left: tileSize, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 10, number: 11, row: 2, column: 2, left: tileSize * 2, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 11, number: 12, row: 2, column: 3, left: tileSize * 3, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 12, number: 13, row: 3, column: 0, left: 0, top: tileSize * 3, width: tileSize, height: tileSize },
      { tileId: 13, number: 14, row: 3, column: 1, left: tileSize, top: tileSize * 3, width: tileSize, height: tileSize },
      { tileId: 14, number: 15, row: 3, column: 2, left: tileSize * 2, top: tileSize * 3, width: tileSize, height: tileSize },
      { tileId: 15, number: 16, row: 3, column: 3, left: tileSize * 3, top: tileSize * 3, width: tileSize, height: tileSize },
    ];

    expect(utils.isSolvable(tiles, gridSize)).toBe(true);
  });

  it('should detect unsolvable tile configurations', () => {
    // Swap positions 13 and 14 (numbers 14 and 15) creating 1 inversion
    // Blank remains at bottom (odd row from bottom), so this is unsolvable
    const tiles = [
      { tileId: 0, number: 1, row: 0, column: 0, left: 0, top: 0, width: tileSize, height: tileSize },
      { tileId: 1, number: 2, row: 0, column: 1, left: tileSize, top: 0, width: tileSize, height: tileSize },
      { tileId: 2, number: 3, row: 0, column: 2, left: tileSize * 2, top: 0, width: tileSize, height: tileSize },
      { tileId: 3, number: 4, row: 0, column: 3, left: tileSize * 3, top: 0, width: tileSize, height: tileSize },
      { tileId: 4, number: 5, row: 1, column: 0, left: 0, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 5, number: 6, row: 1, column: 1, left: tileSize, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 6, number: 7, row: 1, column: 2, left: tileSize * 2, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 7, number: 8, row: 1, column: 3, left: tileSize * 3, top: tileSize, width: tileSize, height: tileSize },
      { tileId: 8, number: 9, row: 2, column: 0, left: 0, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 9, number: 10, row: 2, column: 1, left: tileSize, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 10, number: 11, row: 2, column: 2, left: tileSize * 2, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 11, number: 12, row: 2, column: 3, left: tileSize * 3, top: tileSize * 2, width: tileSize, height: tileSize },
      { tileId: 12, number: 13, row: 3, column: 0, left: 0, top: tileSize * 3, width: tileSize, height: tileSize },
      { tileId: 13, number: 15, row: 3, column: 1, left: tileSize, top: tileSize * 3, width: tileSize, height: tileSize },
      { tileId: 14, number: 14, row: 3, column: 2, left: tileSize * 2, top: tileSize * 3, width: tileSize, height: tileSize },
      { tileId: 15, number: 16, row: 3, column: 3, left: tileSize * 3, top: tileSize * 3, width: tileSize, height: tileSize },
    ];

    expect(utils.isSolvable(tiles, gridSize)).toBe(false);
  });
});
