import { pipe } from "../src"
import { toUpper, exclaim, smile } from "./testUtils"

const piped = pipe(toUpper, exclaim, smile)

describe("pipe", () => {
  test("should throw an error when no functions are passed", () => {
    expect(pipe()).toThrow()
  })

  test("should return composed function", () => {
    expect(typeof pipe()).toBe("function")
  })

  test("should return correct value", () => {
    expect(piped("testing pipe")).toBe("TESTING PIPE! :)")
  })
})
