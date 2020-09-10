import { Identity } from "../src"
import { exclaim, toUpper, smile, id } from "./testUtils"

describe("Identity", () => {
  test("should be mappable", () => {
    const result = Identity("hello")
      .map(toUpper)
      .map(exclaim)
      .map(smile)
      .fold(id)

    expect(result).toBe("HELLO! :)")
  })

  test("should chain other types", () => {
    const result = Identity("hello")
      .map(toUpper)
      .chain(upper =>
        Identity(" world")
          .map(exclaim)
          .map(smile)
          .map(smiled => upper + smiled)
      )
      .fold(id)

    expect(result).toBe("HELLO world! :)")
  })

  test("should concat value from other types", () => {
    const result = Identity("hello")
      .map(toUpper)
      .concat(Identity(" world").map(exclaim).map(smile))
      .fold(id)

    expect(result).toBe("HELLO world! :)")
  })

  test("should concat array or str", () => {
    const arrAndArr = Identity(["hello", "world"])
      .map(x => x.map(toUpper))
      .concat(Identity(["!"]).map(xs => xs.map(smile)))
      .fold(id)

    const arrAndStr = Identity(["hello", "world"])
      .map(x => x.map(toUpper))
      .concat(Identity("!").map(smile))
      .fold(id)

    expect(arrAndArr).toEqual(["HELLO", "WORLD", "! :)"])
    expect(arrAndStr).toEqual(["HELLO", "WORLD", "! :)"])
  })

  test("should return correct value when of is used", () => {
    expect(Identity.of(2).fold(id)).toBe(2)
  })
})
