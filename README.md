# iso-error

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Github NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]
[![Codacy Badge][codacy-image]][codacy-url]

[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

Isomorphic errors are errors that work across physical boundary.

## IsoError

The base class of all isomorphic errors.

It improves upon the base `Error` with:

- `name`: the name of the error is adjusted to be the name of the sub-class. This means it can be used to check for the type of the error.
- Work with `instanceof` (before crossing physical boundary)
- `errors`: an optional property that contains the cause(s) of the error.
- The prototype chain is restored for you so you don't need to do `Object.setPrototypeOf(this, new.target.prototype)` yourself.
  For more information, you can check it out [here](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)

## ModuleError

An `IsoError` with an additional `module` property.

The `module` property indicates the name of the module / package defining the error.

Most of the time you should use this over the `IsoError` class,
as it describes the origin of the error.

```ts
import { ModuleError } from 'iso-error'

export class YourPackageBaseError extends ModuleError {
  constructor(description: string, ...errors: Error[]) {
    super('your-package', description, ...errors)
  }
}
```

### Serialize and Deserialize

`IsoError.serialize()` and `IsoError.deserialize()` is the main mechanism to pass `IsoError` across physical boundary.

`isoError.toString()` produces the same result as `IsoError.serialize()`.

The errors are serialized to json string.

```ts
// service
import { IsoError } from 'iso-error'

route('someroute', (request, response) => {
  try {
    doSomething()
  }
  catch (e) {
    response.status(400)
    response.body(IsoError.serialize(e)) // or just `e.toString()`
  }
})

// client
import { IsoError } from 'iso-error'

fetch('someroute').then(async response => {
  if (response.status !== 200) {
    throw IsoError.deserialize(await response.body())
  }
})
```

### toSerializable and fromSerializable

If you want to work on object instead of string,
you can use `toSerializable()` and `fromSerializable()`.

```ts
// service
import { IsoError } from 'iso-error'

route('someroute', (request, response) => {
  try {
    doSomething()
  }
  catch (e) {
    response.status(400)
    const obj = IsoError.toSerializable(e)
    response.body(JSON.stringify(obj))
  }
})

// client
import { IsoError } from 'iso-error'

fetch('someroute').then(async response => {
  if (response.status !== 200) {
    throw IsoError.fromSerializable(await response.json())
  }
})
```

### Stringify and Parse

`IsoError.stringify()` and `IsoError.parse()` are alias to `IsoError.serialize()` and `IsoError.deserialize()` respectively.

### Plugin

You can install plugins to provide special handling of the serialization.

```ts
import { IsoError } from 'iso-error'
import { plugin, InvalidArgument } from 'iso-error-google-cloud-api'

IsoError.addPlugin(plugin)

const actual = IsoError.deserialize(IsoError.serialize(new InvalidArgument(...)))

console.info(actual instanceof InvalidArgument) // true
```

### IsoError.create(props)

`IsoError.create()` is a quick way to create an `IsoError` with additional properties.

This is mostly used in one-off situation.
If your package throws many different errors,
you should extend from `ModuleError` instead.

```ts
import { IsoError } from 'iso-error'

throw IsoError.create({ message: 'some message', code: 123, detail: 'some more detail' })
```

### IsoError.trace(err)

Returns the error message including its error causes.

```ts
const err = new IsoError('msg-1', new Error('msg-2'), new IsoError('msg-3'))

IsoError.trace(err)

// output:
// IsoError: msg-1
//   Error: msg-2
//   IsoError: msg-3
```

## Limitation

One limitation remains that you cannot do `err instanceof YourError` across physical boundary.
But `err instanceof IsoError` and `err instanceof Error` works fine.
You should use the `err.name` to check for the type of your error.

## What about stack trace

Stack trace is maintained inside a physical boundary, just like `Error` does.
For security reasons, stack trace is not propagated accross physical boundary.

If you think about it, stack trace is useful only to your team who originates the error.
Your consumer should not know or care about the stack trace.
They contains information about the internal structure of your package and is fragile.

Use the `errors` property to provide a humanly understandable trace.

[codacy-image]: https://api.codacy.com/project/badge/Grade/ff81d2922cac4b249a9fce328e3487cd
[codacy-url]: https://www.codacy.com/manual/homawong/iso-error?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=unional/iso-error&amp;utm_campaign=Badge_Grade
[codecov-image]: https://codecov.io/gh/unional/iso-error/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/iso-error
[downloads-image]: https://img.shields.io/npm/dm/iso-error.svg?style=flat
[downloads-url]: https://npmjs.org/package/iso-error
[github-nodejs]: https://github.com/unional/iso-error/workflows/nodejs/badge.svg
[github-action-url]: https://github.com/unional/iso-error/actions
[greenkeeper-image]: https://badges.greenkeeper.io/unional/iso-error.svg
[greenkeeper-url]: https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/iso-error.svg?style=flat
[npm-url]: https://npmjs.org/package/iso-error
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
