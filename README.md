# Functional Programming utils and types

Hi! I am Takuya. Functional Programming utils and types provides you utilities and types that are well documented and easy to use.

## Install Functional Programming utils and types

**npm install fp-utils-types**
**yarn add fp-utils-types**

## Documentations

### Compose

**(functions) => composed function**

```
import { compose } from 'fp-utils-types'

const composed = compose(smile, exclaim, toUpper)
composed('hello') // 'HELLO! :)'
```

### Pipe

**(functions) => composed function**

```
import { pipe } from 'fp-utils-types'

const piped = pipe(toUpper, exclaim, smile)
composed('hello') // 'HELLO! :)'
```

### CurryN

**(number, function) => curried function**

```
import { curriedN } from 'fp-utils-types'

const obj = { name: 'foo' }
const prop = (key, obj, defaultValue) => (obj[key] ? obj[key] : defaultValue)

const curried1 = curryN(3, prop)('name', example)('hey')
const curried2 = curryN(3, props)('name')(example)('hey)
curried1({ name: 'foo' }) // 'foo'
curried2({ name: 'foo' }) // 'foo'
```
