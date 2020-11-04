const filterReducer = f => combiner => {
  const reducer = (acc, x) => (f(x) ? combiner(acc, x) : acc)

  return reducer
}

export default filterReducer
