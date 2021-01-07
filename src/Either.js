import fromNullable from "./fromNullable"

const Left = x => ({
  x,
  isLeft: true,
  isRight: false,
  map: f => Left(x),
  chain: f => Left(x),
  concat: other => Left(x),
  fold: (f, g) => f(x),
})

const Right = x => ({
  x,
  isLeft: false,
  isRight: true,
  map: f => Right(f(x)),
  chain: f => f(x),
  concat: other => (other.isLeft ? other : Right(x.concat(other.x))),
  fold: (f, g) => g(x),
})

const Either = x => Right(x)

Either.of = x => Either.Right(x)

Either.Left = Left
Either.Right = Right

Either.fromNullable = x => (fromNullable(x) ? Either.Right(x) : Either.Left(x))

export default Either
