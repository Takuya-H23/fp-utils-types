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
  test.each([
    [Either.of("Hi")],
    [Either.Right("Hi")],
    [Either.fromNullable("Hi")],
  ])("should return right", either => {
    expect(either).toHaveProperty("isLeft", false)
  })

  test.each([[Either.Left("Hi"), Either.fromNullable(null)]])(
    "should return left",
    left => {
      expect(left).toHaveProperty("isLeft", true)
    }
  )

  test("should be mappable when Right", () => {
    expect(sayItNicely("hello").fold(errorMsg, id)).toBe("HELLO! :)")
  })

  test("should not map and run Left callback", () => {
    expect(sayItNicely().fold(errorMsg, id)).toBe("Nope")
  })

  test("should chain", () => {
    expect(getFullNameWithCain("john", "doe").fold(errorMsg, id)).toBe(
      "JOHN DOE :)"
    )
  })

  test("should concat Right", () => {
    expect(getFullName("john", " doe").fold(id, id)).toBe("JOHN DOE :)")
    expect(getFullNameFromArr(["john"], ["doe"]).fold(id, id)).toEqual([
      "JOHN",
      "DOE :)",
    ])
  })

  test.each([
    [getFullName("john")],
    [getFullName(null, "doe")],
    [getFullNameFromArr()],
    [getFullNameFromArr(["john"])],
    [getFullNameWithCain("john")],
  ])("should run Left callback", Left => {
    expect(Left.fold(errorMsg, id)).toBe(errorMsg())
  })
})
