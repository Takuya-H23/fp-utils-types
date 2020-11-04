import { compose, mapReducer, pipe } from "../src"
import { add, combinerByConcat, toUpper } from "./testUtils"
const ss = ["foo", "john", "doe"]
const ns = [1, 2, 3]

const add1 = add(1)

test("should return a reducer", () => {
  const transducer = compose(mapReducer(add1))
  const result = ns.reduce(transducer(combinerByConcat), [])
  const result2 = ns.reduce(transducer(add), 0)

  expect(result).toEqual([2, 3, 4])
  expect(result2).toBe(9)
})

test("should composed mapReducer", () => {
  const transducer = compose(mapReducer(add1), mapReducer(add1))
  const numResult = ns.reduce(transducer(add), 0)
  const strResult = ss.reduce(
    pipe(
      mapReducer(toUpper),
      mapReducer(x => x.toLowerCase())
    )(add),
    ""
  )

  expect(numResult).toEqual(12)
  expect(strResult).toBe("FOOJOHNDOE")
})
