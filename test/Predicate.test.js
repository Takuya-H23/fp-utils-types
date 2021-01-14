import Predicate from "../src/Predicate"

const isString = x => typeof x === "string"
const isNumber = x => typeof x === "number"
const isEven = x => x % 2 === 1

test("should return true", () => {
  const test = Predicate.of(isString)
  expect(test.run("hello")).toBe(true)
})

test("should return false", () => {
  const test = Predicate.of(isNumber)
  expect(test.run("hi")).toBe(false)
})

test.each([
  [1, true],
  [333, true],
  [2, false],
  ["1", false],
  [34, false]
])(
  "should concat predicate functions and return correct value",
  (arg, expected) => {
    const test = Predicate.of(isNumber).concat(Predicate.of(isEven))
    expect(test.run(arg)).toBe(expected)
  }
)

test.each([
  [{ name: "john", age: 2 }, false],
  [{ name: 13, age: 1 }, false],
  [{ name: "foo", age: 2 }, false],
  [{ name: "foo", age: 1 }, true],
  [{ name: "foo", age: 1 }, true],
  [{ name: "123", age: 95 }, true]
])("should contramap and return correct value", (arg, expected) => {
  const test = Predicate.of(isString)
    .contramap(x => x.name)
    .concat(Predicate.of(isEven).contramap(x => x.age))

  expect(test.run(arg)).toBe(expected)
})
