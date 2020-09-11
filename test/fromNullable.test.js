import { fromNullable } from "../src"

describe("fromNullable", () => {
  test("should return false", () => {
    expect(fromNullable(null)).toBe(false)
    expect(fromNullable(undefined)).toBe(false)
    expect(fromNullable()).toBe(false)
  })

  test("should return true", () => {
    expect(fromNullable("")).toBe(true)
    expect(fromNullable([])).toBe(true)
    expect(fromNullable({})).toBe(true)
    expect(fromNullable(false)).toBe(true)
    expect(fromNullable(true)).toBe(true)
  })
})
