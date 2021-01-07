import { pipe, mapReducer, filterReducer } from "../src"
import { add, combinerByConcat } from "./testUtils"

const odds = [1, 3, 5, 7]
const xs = [{ num: null }, { num: 2 }, { num: 3 }, { num: null }, { num: null }]

const add1 = add(1)
const isOdd = x => x % 2 === 1
const isEven = x => !isOdd(x)

const getNum = obj => add1(obj.num)

test("should map then filter", () => {
  const oddsTransducer = pipe(filterReducer(isOdd), mapReducer(add1))
  const evenTransducer = pipe(filterReducer(isEven), mapReducer(add1))

  const result1 = odds.reduce(oddsTransducer(combinerByConcat), [])
  const result2 = odds.reduce(evenTransducer(combinerByConcat), [])

  expect(result1).toHaveLength(0)
  expect(result2).toEqual([2, 4, 6, 8])
})

test("should filter null then add 1", () => {
  const transducer = pipe(
    mapReducer(getNum),
    filterReducer(x => Boolean(x.num))
  )
  const result = xs.reduce(transducer(add), 0)
  expect(result).toBe(7)
})
