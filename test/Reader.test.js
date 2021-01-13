import Reader from "../src/Reader"
import { add, smile, toUpper } from "./testUtils"

const add1 = x => add(1)(x)

test("should map", () => {
  const test = Reader(add1).map(add1).run(1)
  expect(test).toBe(3)
})

test("should concat", () => {
  const test = Reader(smile).concat(Reader(smile)).run("hi")
  expect(test).toEqual("hi :)hi :)")
})

test("should chain", () => {
  const test = Reader(toUpper)
    .chain(upper => Reader(y => [upper, y]))
    .run("hi")
  expect(test).toEqual(["HI", "hi"])
})

test('should work with "of"', () => {
  const test = Reader.of("hi").map(toUpper).run()
  expect(test).toBe("HI")
})

test("should be able to ask ", () => {
  const test = Reader.of("hi")
    .map(toUpper)
    .chain(upper => Reader.ask.map(y => [upper, y]))
    .run("hello")
  expect(test).toEqual(["HI", "hello"])
})
