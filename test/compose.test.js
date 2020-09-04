import { compose } from "../src"

const toUpper = s => s.toUpper()
const exclaim = s => s + "!"
const smile = s => s + " :)"

describe("Compose", () => {
  test.todo("should throw an error if no functions are passed")

  test("should return composed function", () => {
    expect(typeof compose(toUpper, exclaim, smile)).toBe("function")
  })

  test.todo("should return correct value")
})
