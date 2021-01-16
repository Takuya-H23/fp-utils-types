import Reader from "../src/Reader"
import { add, smile, toUpper } from "./testUtils"

const add1 = x => add(1)(x)

test("should return value", () => {
  const test = new Reader(x => x)
  expect(test.run("hi")).toBe("hi")
})

test("should map", () => {
  const test = Reader.of(1).map(add1).run()
  expect(test).toBe(2)
})

test("should concat", () => {
  const test = new Reader(smile).concat(new Reader(smile)).run("hi")
  expect(test).toEqual("hi :)hi :)")
})

test("should concat array of values", () => {
  const test = new Reader(x => x)
    .map(xs => xs.map(toUpper))
    .concat(Reader.of(["doe"]).map(xs => xs.map(smile)))
    .run(["john"])

  expect(test).toEqual(["JOHN", "doe :)"])
})

test("should chain", () => {
  const test = Reader.of("hi")
    .map(toUpper)
    .chain(upper => new Reader(y => [upper, y]))
    .run("hi")
  expect(test).toEqual(["HI", "hi"])
})

test("should chain works with 'of'", () => {
  const test = Reader.of("hi")
    .map(toUpper)
    .chain(upper => Reader.of("of").map(x => [upper, x]))
    .run("hi")
  expect(test).toEqual(["HI", "of"])
})

test("should be able to ask ", () => {
  const test = Reader.of("hi")
    .map(toUpper)
    .chain(upper => Reader.ask.map(y => [upper, y]))
    .run("hello")
  expect(test).toEqual(["HI", "hello"])
})
