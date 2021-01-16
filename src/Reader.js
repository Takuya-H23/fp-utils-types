import compose from "./compose"
class Reader {
  constructor(f) {
    this.run = f
  }

  static of(x) {
    return new Reader(() => x)
  }

  map(f) {
    this.run = compose(f, this.run)
    return this
  }

  chain(f) {
    return new Reader(x => compose(f, this.run)(x).run(x))
  }

  concat(other) {
    return new Reader(x => this.run(x).concat(other.run(x)))
  }
}

Reader.ask = new Reader(x => x)

export default Reader
