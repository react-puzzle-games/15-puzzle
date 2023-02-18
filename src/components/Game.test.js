// @ts-check

import React from "react";
import renderer from "react-test-renderer";
import Game from "./Game";

test("Game renders correctly", () => {
  const tree = renderer
    .create(
      <Game
        gridSize={4}
        tileSize={90}
        numbers={[]}
        onResetClick={() => {}}
        onNewClick={() => {}}
        original={[]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
