import { filterReducer, pipe } from "../src"
import { combinerByConcat } from "./testUtils"

const ns = [1, 2, 3]
const xs = ["foo", 2, [], "3", 1, "test", 1]
const is1 = x => x === 1
const isStringOrNum = x => typeof x === "string" || typeof x === "number"

test("should work as callback of reduce", () => {
  const result = ns.reduce(filterReducer(is1)(combinerByConcat), [])
  expect(result).toEqual([1])
})

test("should work as transducer", () => {
  const transducer = pipe(filterReducer(isStringOrNum))(combinerByConcat)
  const result = xs.reduce(transducer, [])

  expect(result).toEqual(["foo", 2, "3", 1, "test", 1])
})
