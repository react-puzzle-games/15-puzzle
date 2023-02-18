// @ts-check

import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

test("App renders correctly", () => {
  const tree = renderer
    .create(
      <App
        level={{
          tileSet: [4, 6, 11, 1, 2, 16, 3, 15, 10, 9, 7, 13, 12, 14, 8, 5],
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
