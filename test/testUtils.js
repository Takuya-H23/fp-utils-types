import { curryN } from "../src"

export const toUpper = s => s.toUpperCase()
export const exclaim = s => s + "!"
export const smile = s => s + " :)"
export const add = curryN(2, (x, y) => x + y)
export const combinerByConcat = (acc, x) => acc.concat(x)
export const id = x => x
