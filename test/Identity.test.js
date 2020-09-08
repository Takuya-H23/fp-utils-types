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
          .fold(latter => upper + latter)
      )

    expect(result).toBe("HELLO world! :)")
  })

  test("should concat value from other types", () => {
    const result = Identity("hello")
      .map(toUpper)
      .concat(Identity(" world").map(exclaim).map(smile))
      .fold(id)

    expect(result).toBe("HELLO world! :)")
  })
})
