export const ERROR_NEED_A_FUNCTION = "Needs at least one function"

const compose = (...fns) => {
  if (fns.length <= 0) throw new Error(ERROR_NEED_A_FUNCTION)

  return x => fns.reduceRight((acc, fn) => fn(acc), x)
}

export default compose
