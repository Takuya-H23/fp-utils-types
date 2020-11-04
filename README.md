# Functional Programming utils and types

Hi! I am Takuya. Functional Programming utils and types provides you utilities and types that are well documented and easy to use.

## Documentations

### Compose

**(functions) => composed function**

```
import { compose } from 'fp-utils-types'

const composed = compose(smile, exclaim, toUpper)
composed('hello') // 'HELLO! :)'
```

### CurryN

**(number, function) => curried function**

```
import { curryN } from 'fp-utils-types'

const obj = { name: 'foo' }
const prop = (key, obj, defaultValue) => (obj[key] ? obj[key] : defaultValue)

const curried1 = curryN(3, prop)('name', example)('hey')
const curried2 = curryN(3, prop)('name')(example)('hey')
curried1({ name: 'foo' }) // 'foo'
curried2({ name: 'foo' }) // 'foo'
```

### FilterReducer

**(a -> b) => ((a, b) -> c) => ((a, b) -> c)**

```
import { filterReducer } from 'fp-utils-types'

const ns = [1, 2, 3]
const is1 = x => x === 1

ns.reduce(filterReducer(is1)(combinerByConcat), []) // [1]

```

### MapReducer

**(a -> b) => ((a, b) -> c) => ((a, b) -> c)**

```
import { compose, curryN, mapReducer } from 'fp-utils-types'

const ns = [1, 2, 3]
const add = curryN(2, (x, y) => x + y)
const add1 = add(1)
const combinerByConcat = (acc, x) => acc.concat(x)

const transducer = compose(mapReducer(add1))

ns.reduce(transducer(combinerByConcat), []) // [2, 3, 4]
ns.reduce(transducer(add), 0) // 9

```

### Pipe

**(functions) => piped function**

```
import { pipe } from 'fp-utils-types'

const piped = pipe(toUpper, exclaim, smile)
composed('hello') // 'HELLO! :)'
```

### Either

**(any) => Left(any) | Right(any)**

| Methods | Argument      | Return                                                                                                     |
| ------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| map     | unary         | Left or Right                                                                                              |
| chain   | unary         | Left or Right (chain itself returns the value of Left or Right so your unary needs to return Left or Right |
| concat  | Left or Right | Left or Right (concat if both of them are Right. Otherwise keep Left)                                      |
| fold    | unary, unary  | First unary is for when the value is Left. Second unary runs when the value is Right                       |

```
import { Either, id } from "fp-utils-types"
const { Left, Right } = Either

const isString = s => typeof(s) === 'string' ? Right(s) : Left(s)

const sayItNicely = s =>
  Either.fromNullable(s).map(toUpper).map(compose(smile, exclaim))

sayItNicely('hello').fold(() => "Left", id) // "HELLO! :)"
sayItNicely(null).fold(() => "Left", id) // "Left"
```

### Identity

**(any) => Identity(Any)**

| Methods | Argument | Return                                                                                      |
| ------- | -------- | ------------------------------------------------------------------------------------------- |
| map     | unary    | Identity                                                                                    |
| chain   | unary    | Identity (chain itself returns the value of Identity so your unary needs to return Identity |
| concat  | Identity | Identity                                                                                    |
| fold    | unary    | value                                                                                       |

```
import { Identity } from "fp-utils-types"

Identity("hello")
      .map(toUpper)
      .map(exclaim)
      .map(smile)
      .fold(id) // "HELLO! :)"

Identity("hello")
      .map(toUpper)
      .concat(Identity(" world").map(exclaim).map(smile))
      .fold(id) // "HELLO world! :)"

Identity(["hello", "world"])
      .map(x => x.map(toUpper))
      .concat(Identity(["!"]).map(xs => xs.map(smile)))
      .fold(id) // ["HELLO", "WORLD", "! :)"]
```
