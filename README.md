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

### Pipe

**(functions) => piped function**

```
import { pipe } from 'fp-utils-types'

const piped = pipe(toUpper, exclaim, smile)
composed('hello') // 'HELLO! :)'
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
