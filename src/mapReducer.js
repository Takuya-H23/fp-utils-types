const mapReducer = f => combiner => {
  const reducer = (acc, x) => combiner(acc, f(x))

  return reducer
}

export default mapReducer
