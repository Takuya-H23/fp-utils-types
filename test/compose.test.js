import { compose } from "../src"
import { ERROR_NEED_A_FUNCTION } from "../src/compose"
import { toUpper, exclaim, smile } from "./testUtils"

const composed = compose(smile, exclaim, toUpper)

describe("Compose", () => {
  test("should throw an error if no functions are passed", () => {
    expect(() => {
      compose()
    }).toThrow(ERROR_NEED_A_FUNCTION)
  })

  test("should return composed function", () => {
    expect(typeof compose(toUpper, exclaim, smile)).toBe("function")
  })

  test("should return correct value", () => {
    expect(composed("hello")).toBe("HELLO! :)")
  })
})
