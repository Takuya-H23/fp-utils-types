export const ERROR_NEED_A_FUNCTION = "Compose needs at least one function"

const compose = (...fns) => x => {
  if (fns.length <= 0) throw new Error(ERROR_NEED_A_FUNCTION)
  return fns.reduceRight((acc, fn) => fn(acc), x)
}

export default compose
