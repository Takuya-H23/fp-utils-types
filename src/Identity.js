const Identity = x => ({
  x,
  map: f => Identity(f(x)),
  chain: f => f(x),
  concat: other => Identity(x.concat(other.x)),
  fold: f => f(x),
})

Identity.of = x => Identity(x)

export default Identity
