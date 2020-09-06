import { pipe } from "../src"
import { ERROR_NEED_A_FUNCTION } from "../src/compose"
import { toUpper, exclaim, smile } from "./testUtils"

const piped = pipe(toUpper, exclaim, smile)

describe("pipe", () => {
  test("should throw an error when no functions are passed", () => {
    expect(() => {
      pipe()
    }).toThrow(ERROR_NEED_A_FUNCTION)
  })

  test("should return composed function", () => {
    expect(typeof piped).toBe("function")
  })

  test("should return correct value", () => {
    expect(piped("testing pipe")).toBe("TESTING PIPE! :)")
  })
})
