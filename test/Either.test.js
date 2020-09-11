import { Either } from "../src"

const { Left, Right } = Either

describe("Either", () => {
  test("should return right", () => {
    expect(Either.of("Hi")).toHaveProperty("isLeft", false)
  })
})
