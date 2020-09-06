export const ERROR_NOT_NUMBER = "First argument must be a number"
export const ERROR_NOT_FUNCTION = "Second argument must be a function"

const curryN = (n, f) => {
  if (typeof n !== "number") throw new Error(ERROR_NOT_NUMBER)
  if (typeof f !== "function") throw new Error(ERROR_NOT_FUNCTION)

  return (...args) => {
    if (args.length === n) {
      return f(...args)
    }

    const preCurried = cur => (...rest) => {
      const acc = [...cur, ...rest]

      return acc.length === n ? f(...acc) : preCurried(acc)
    }

    return preCurried(args)
  }
}

export default curryN
