import { compose } from "../src"

const toUpper = s => s.toUpperCase()
const exclaim = s => s + "!"
const smile = s => s + " :)"

const composed = compose(smile, exclaim, toUpper)

describe("Compose", () => {
  test("should throw an error if no functions are passed", () => {
    expect(compose()).toThrow()
  })

  test("should return composed function", () => {
    expect(typeof compose(toUpper, exclaim, smile)).toBe("function")
  })

  test("should return correct value", () => {
    expect(composed("hello")).toBe("HELLO! :)")
  })
})
