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
