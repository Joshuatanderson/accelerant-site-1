import { add } from "./p5Regex";

const positiveTestCases = [];
const negativeTestCases = [];

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

module.exports = {};
