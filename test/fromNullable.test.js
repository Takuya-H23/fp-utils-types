import { fromNullable } from "../src"

describe("fromNullable", () => {
  test.each([[null], [undefined]])("should return false", arg => {
    expect(fromNullable(arg)).toBe(false)
  })

  test.each([[""], [[]], [{}], [false], [true]])("should return true", arg => {
    expect(fromNullable(arg)).toBe(true)
  })
})
