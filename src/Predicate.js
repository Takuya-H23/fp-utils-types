export default class Predicate {
  constructor(run) {
    this.run = run
  }

  static of(run) {
    return new Predicate(run)
  }

  concat(other) {
    return new Predicate(x => this.run(x) && other.run(x))
  }
}
