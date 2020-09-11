const Either = x => ({
  x,
  isLeft: false,
  map: f => Right(f(x)),
  chain: f => f(x),
  concat: other => (other.isLeft ? Right(x) : x.concat(other.x)),
  fork: (f, g) => g(x),
})

Either.Left = x => ({
  x,
  isLeft: true,
  map: f => Left(x),
  chain: f => Left(x),
  concat: other => Left(x),
  fork: (f, g) => f(x),
})

Either.Right = x => ({
  x,
  isLeft: false,
  map: f => Right(f(x)),
  chain: f => f(x),
  concat: other => (other.isLeft ? Right(x) : x.concat(other.x)),
  fork: (f, g) => g(x),
})

Either.of = x => Either.Right(x)

Either.fromNullable = x => (x != null ? Either.Right(x) : Either.Left(x))

export default Either
