import factory from "./levels-factory";

it("throws if given a size that is not a perfect square", () => {
  expect(() => factory(13)).toThrowError();
});

it("throws if given a size below 1", () => {
  expect(() => factory(0)).toThrowError();
  expect(() => factory(-1)).toThrowError();
});

it("throws if given a size above 100", () => {
  expect(() => factory(101)).toThrowError();
});

it("generates random levels of size 1", () => {
  const level = factory(1);

  expect(level.tileSet).toHaveLength(1);
  expect(level.tileSet[0]).toBeGreaterThan(-1);
  expect(level.tileSet[0]).toBeLessThan(100);
});

it("generates random levels of size n", () => {
  const level = factory(16);

  expect(level.tileSet).toHaveLength(6);
  level.tileSet.forEach((n) => {
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(17);
  });
});
