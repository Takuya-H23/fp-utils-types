import IO from "../src/IO"
import { add, toUpper, smile } from "./testUtils"

const add1 = add(1)

test("should function as id", () => {
  expect(IO.of(2).unsafePerformIO()).toBe(2)
})

test("should map twice", () => {
  expect(IO.of(2).map(add1).map(add1).unsafePerformIO()).toBe(4)
})

test("should chain IO", () => {
  expect(
    IO.of("hello")
      .map(toUpper)
      .chain(upper => IO.of(upper + " world").map(smile))
      .unsafePerformIO()
  ).toBe("HELLO world :)")
})

test("should concat 2 IO", () => {
  expect(
    IO.of(0)
      .map(add(10))
      .chain(sum => IO.of(sum * sum).map(add1))
      .unsafePerformIO()
  ).toBe(101)
})

test("should concat 2 array", () => {
  expect(
    IO.of(2)
      .map(x => x * 100)
      .chain(result =>
        IO.of([result, 25]).map(x => x.reduce((acc, y) => add(acc, y)))
      )
      .unsafePerformIO()
  ).toBe(225)
})
