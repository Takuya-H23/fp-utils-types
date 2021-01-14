import compose from "./compose"
// const Reader = run => ({
//   run,
//   map: f => Reader(x => f(run(x))),
//   chain: f => Reader(x => f(run(x)).run(x)),
//   concat: other => Reader(x => run(x).concat(other.run(x))),
// })

// Reader.of = x => Reader(() => x)
// Reader.ask = Reader(x => x)

class Reader {
  constructor(f) {
    this._run = f
  }

  static of(x) {
    return new Reader(() => x)
  }

  run(x) {
    return this._run(x)
  }

  map(f) {
    this._run = compose(f, this._run)
    return this
  }

  chain(f) {
    return new Reader(x => compose(f, this._run)(x).run(x))
  }

  concat(other) {
    return new Reader(x => this._run(x).concat(other.run(x)))
  }
}

Reader.ask = new Reader(x => x)

export default Reader
