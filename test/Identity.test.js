import { Identity } from "../src"
import { exclaim, toUpper, smile, id } from "./testUtils"

describe("Identity", () => {
  test("should be mappable", () => {
    const result = Identity.of("hello")
      .map(toUpper)
      .map(exclaim)
      .map(smile)
      .fold(id)

    expect(result).toBe("HELLO! :)")
  })

  test("should chain other types", () => {
    const result = Identity.of("hello")
      .map(toUpper)
      .chain(upper =>
        Identity.of(" world")
          .map(exclaim)
          .map(smile)
          .map(smiled => upper + smiled)
      )
      .fold(id)

    expect(result).toBe("HELLO world! :)")
  })

  test("should concat value from other types", () => {
    const result = Identity.of("hello")
      .map(toUpper)
      .concat(Identity.of(" world").map(exclaim).map(smile))
      .fold(id)

    expect(result).toBe("HELLO world! :)")
  })

  test("should concat array or str", () => {
    const arrAndArr = Identity.of(["hello", "world"])
      .map(x => x.map(toUpper))
      .concat(Identity.of(["!"]).map(xs => xs.map(smile)))
      .fold(id)

    const arrAndStr = Identity.of(["hello", "world"])
      .map(x => x.map(toUpper))
      .concat(Identity.of("!").map(smile))
      .fold(id)

    expect(arrAndArr).toEqual(["HELLO", "WORLD", "! :)"])
    expect(arrAndStr).toEqual(["HELLO", "WORLD", "! :)"])
  })

  test("should return correct value when of is used", () => {
    expect(Identity.of(2).fold(id)).toBe(2)
  })
})
