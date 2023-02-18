// @ts-check

import React from "react";
import renderer from "react-test-renderer";
import { GAME_STARTED } from "../lib/game-status";
import Menu from "./Menu";

describe("Menu renders correctly", () => {
  test("given default values", () => {
    const tree = renderer
      .create(
        <Menu
          seconds={0}
          moves={0}
          onResetClick={() => {}}
          onPauseClick={() => {}}
          onNewClick={() => {}}
          gameState={GAME_STARTED}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
