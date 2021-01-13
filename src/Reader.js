const Reader = run => ({
  run,
  map: f => Reader(x => f(run(x))),
  chain: f => Reader(x => f(run(x)).run(x)),
  concat: other => Reader(x => run(x).concat(other.run(x))),
})

Reader.of = x => Reader(() => x)
Reader.ask = Reader(x => x)

export default Reader
