import { Either, compose } from "../src"
import { toUpper, smile, exclaim, id } from "./testUtils"

const sayItNicely = s =>
  Either.fromNullable(s).map(toUpper).map(compose(smile, exclaim))

const getFullNameWithCain = (fn, ln) =>
  Either.fromNullable(fn)
    .map(toUpper)
    .chain(first =>
      Either.fromNullable(ln)
        .map(compose(smile, toUpper))
        .map(ln => first + " " + ln)
    )
    .fork(() => "Nope", id)

const getFullName = (fn, ls) =>
  Either.fromNullable(fn)
    .map(toUpper)
    .concat(Either.fromNullable(ls).map(compose(smile, toUpper)))

const getFullNameFromArr = (fn, ls) =>
  Either.fromNullable(fn)
    .map(x => x.map(toUpper))
    .concat(Either.fromNullable(ls).map(x => x.map(compose(smile, toUpper))))

const errorMsg = () => "Nope"

describe("Either", () => {
  test("should return right", () => {
    expect(Either.of("Hi")).toHaveProperty("isLeft", false)
    expect(Either.Right("Hi")).toHaveProperty("isLeft", false)
    expect(Either.fromNullable("Hi")).toHaveProperty("isLeft", false)
  })

  test("should return left", () => {
    expect(Either.Left("Hi")).toHaveProperty("isLeft", true)
    expect(Either.fromNullable(null)).toHaveProperty("isLeft", true)
  })

  test("should be mappable when Right", () => {
    expect(sayItNicely("hello").fork(errorMsg, id)).toBe("HELLO! :)")
  })

  test("should not map and run Left callback", () => {
    expect(sayItNicely().fork(errorMsg, id)).toBe("Nope")
  })

  test("should chain", () => {
    expect(getFullNameWithCain("john", "doe")).toBe("JOHN DOE :)")
  })

  test("should concat Right", () => {
    expect(getFullName("john", " doe").fork(id, id)).toBe("JOHN DOE :)")
    expect(getFullNameFromArr(["john"], ["doe"]).fork(id, id)).toEqual([
      "JOHN",
      "DOE :)",
    ])
  })

  test("should run Left callback", () => {
    expect(getFullName("john").fork(errorMsg, id)).toBe("Nope")
    expect(getFullName(null, "doe").fork(errorMsg, id)).toBe("Nope")
    expect(getFullNameFromArr().fork(errorMsg, id)).toBe("Nope")
    expect(getFullNameFromArr(["john"]).fork(errorMsg, id)).toBe("Nope")
    expect(getFullNameWithCain("john")).toBe("Nope")
  })
})
