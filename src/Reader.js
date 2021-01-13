const Reader = run => ({
  run,
  map: f => Reader(x => f(run(x))),
  concat: other => Reader(x => run(x).concat(other.run(x))),
  fold: x => run(x),
})

export default Reader
