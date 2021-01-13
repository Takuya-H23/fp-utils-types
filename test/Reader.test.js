import Reader from "../src/Reader"
import { add, smile } from "./testUtils"

const add1 = x => add(1)(x)

test("should map", () => {
  const test = Reader(add1).map(add1).run(1)
  expect(test).toBe(3)
})

test("should concat", () => {
  const test = Reader(smile).concat(Reader(smile)).run("hi")
  expect(test).toEqual("hi :)hi :)")
})
