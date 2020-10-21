import { compose, mapReducer, pipe } from "../src"
import { add, toUpper } from "./testUtils"
const ss = ["foo", "john", "doe"]
const ns = [1, 2, 3]

const add1 = add(1)
const combiner = (acc, x) => acc.concat(x)
const nonCurryAdd = (x, y) => x + y

test("should return a reducer", () => {
  const transducer = compose(mapReducer(add1))(combiner)
  const result = ns.reduce(transducer, [])

  expect(result).toEqual([2, 3, 4])
})

test("should composed mapReducer", () => {
  const transducer = compose(mapReducer(add1), mapReducer(add1))
  const numResult = ns.reduce(transducer(nonCurryAdd), 0)
  const strResult = ss.reduce(
    pipe(
      mapReducer(toUpper),
      mapReducer(x => x.toLowerCase())
    )(nonCurryAdd),
    ""
  )

  expect(numResult).toEqual(12)
  expect(strResult).toBe("FOOJOHNDOE")
})
