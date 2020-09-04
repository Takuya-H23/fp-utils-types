const compose = (...fns) => x => {
  if (fns.length <= 0) throw new Error("Compose needs at least one function")
  return fns.reduceRight((acc, fn) => fn(acc), x)
}

export default compose
