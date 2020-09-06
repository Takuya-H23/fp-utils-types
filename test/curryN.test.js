import { curryN } from "../src"
import { ERROR_NOT_FUNCTION, ERROR_NOT_NUMBER } from "../src/curryN"

const prop = (key, obj, defaultValue) => (obj[key] ? obj[key] : defaultValue)

const example = { name: "foo", color: "blue" }

describe("curryN", () => {
  test("should throw an error when no number", () => {
    expect(() => {
      curryN("a", prop)
    }).toThrow(ERROR_NOT_NUMBER)
  })

  test("should throw an error when no function being curried", () => {
    expect(() => {
      curryN(3)
    }).toThrow(ERROR_NOT_FUNCTION)
  })

  test("should return correct value", () => {
    const getValueFormObject = curryN(3, prop)
    const result = getValueFormObject("name", example, "hello")
    expect(result).toBe("foo")
  })

  test("should return correct value when not curried", () => {
    const getValueFormObject = curryN(3, prop)
    const result = getValueFormObject("name", example, "def")
    expect(result).toBe("foo")
  })

  test("should return correct value when  curried", () => {
    const getValueFormObject = curryN(3, prop)("name", example)("hey")
    const getValueFormObject2 = curryN(2, prop)("name")(example, "hey")

    expect(getValueFormObject).toBe("foo")
    expect(getValueFormObject2).toBe("foo")
  })
})
