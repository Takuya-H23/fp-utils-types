import compose from "./compose"

class IO {
  static of(x) {
    return new IO(() => x)
  }

  constructor(f) {
    this.unsafePerformIO = f
  }

  map(f) {
    return new IO(compose(f, this.unsafePerformIO))
  }

  chain(f) {
    return this.map(f).join()
  }

  join() {
    return new IO(() => this.unsafePerformIO().unsafePerformIO())
  }

  inspect() {
    return `IO(${this.unsafePerformIO})`
  }
}

export default IO
