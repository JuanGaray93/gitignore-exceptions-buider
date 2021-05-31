var assert = require("assert");
const { buildIgnorePaths } = require(".");

describe("The builder", () => {
  it("can build an exclusion path", () => {
    const expectedPaths = [
      "src/foo/*",
      "!src/foo/baz",
      "src/foo/baz/*",
      "!src/foo/baz/qux",
    ];
    const builtPaths = buildIgnorePaths("src/foo", ["src/foo/baz/qux"]);
    assert.deepStrictEqual(builtPaths, expectedPaths);
  });

  it("can build several paths", () => {
    const expectedPaths = [
      "realExample/*",
      "!realExample/foo",
      "realExample/foo/*",
      "!realExample/foo/bar",
      "realExample/foo/bar/*",
      "!realExample/foo/bar/baz",
      "!realExample/anne",
      "!realExample/qux",
      "!realExample/quux",
      "realExample/quux/*",
      "!realExample/quux/bob",
    ];

    const builtPaths = buildIgnorePaths("realExample", [
      "realExample/foo/bar/baz",
      "realExample/anne",
      "realExample/qux",
      "realExample/quux/bob",
    ]);
    assert.deepStrictEqual(builtPaths, expectedPaths);
  });
});
