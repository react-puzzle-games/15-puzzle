import renderer from 'react-test-renderer';
import React from 'react';
import Grid from './Grid';

describe('Grid renders correctly', () => {
  test('given an empty set of tiles', () => {
    const tree = renderer
      .create(
        <Grid tiles={[]} onTileClick={() => {}} tileSize={90} gridSize={4} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('given one tile', () => {
    const tree = renderer
      .create(
        <Grid
          tiles={[
            {
              tileId: 3,
              width: 90,
              height: 90,
              left: 0,
              top: -180,
            },
          ]}
          onTileClick={() => {}}
          tileSize={90}
          gridSize={1}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('given a set of tiles', () => {
    const tree = renderer
      .create(
        <Grid
          tiles={[
            {
              tileId: 0,
              width: 90,
              height: 90,
              left: 0,
              top: 0,
              number: 4,
            },
            {
              tileId: 1,
              width: 90,
              height: 90,
              left: 90,
              top: 0,
              number: 2,
            },
            {
              tileId: 2,
              width: 90,
              height: 90,
              left: 0,
              top: 90,
              number: 3,
            },
            {
              tileId: 3,
              width: 90,
              height: 90,
              left: 90,
              top: 90,
              number: 1,
            },
          ]}
          onTileClick={() => {}}
          tileSize={90}
          gridSize={1}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
