// const Identity = x => ({
//   x,
//   map: f => Identity(f(x)),
//   chain: f => f(x),
//   concat: other => Identity(x.concat(other.x)),
//   fold: f => f(x),
// })

// Identity.of = x => Identity(x)
class Identity {
  constructor(x) {
    this._x = x
  }

  static of(x) {
    return new Identity(x)
  }

  map(f) {
    return Identity.of(f(this._x))
  }

  chain(f) {
    return f(this._x)
  }

  concat(other) {
    return Identity.of(this._x.concat(other._x))
  }

  fold(f) {
    return f(this._x)
  }
}

export default Identity
