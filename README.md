# iso-error

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Codacy Badge][codacy-image]][codacy-url]

[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

An isomorphic error library.

When sending error across physical boundary,
you always need to do some custom parsing and serializing of the data.

Also, often time the error are not standard and some information are not properly serialized.

This library provide a standard error structure that can be easily serialized and parsed.

## ModuleError

An `IsoError` with an additional `module` field.

The `module` field should contain the name of the module / package defining the error.

Most of the time you should extends from this class instead of the `IsoError` class,
as it describes the origin of the error.

## IsoError

This is the base class of all isomorphic errors.

It is essentially identical to the standard `Error`, with two differences:

- `name`: Name of the error is adjusted to be the name of the sub-class. This means it can be used to check for the type of the error.
- `errors`: This is an optional property that contains the cause(s) of the error.

### Serialize and Deserialize

`IsoError.serialize()` and `IsoError.deserialize()` is the main mechanism to pass `IsoError` across physical boundary.

The error are serialized to json.

```ts
// service
import { IsoError } from 'iso-error'

route('someroute', (request, response) => {
  try {
    doSomething()
  }
  catch (e) {
    response.status(400)
    response.body(IsoError.serialize(e))
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

### Stringify and Parse

`IsoError.stringify()` and `IsoError.parse()` are alias to `IsoError.serialize()` and `IsoError.deserialize()` respectively.

### IsoError.create(props)

`IsoError.create()` is a quick way to create an `IsoError` with additional properties.

This is mostly used for one-off situation.
If your package throw many different errors,
you should consider extending `IsoError` to create a consistent structure as needed.

```ts
import { IsoError } from 'iso-error'

throw IsoError.create({ message: 'some message', code: 123, detail: 'some more detail' })
```

## Limitation

One limitation remains that you cannot do `err instanceof YourError`.
But `err instanceof IsoError` and `err instanceof Error` works fine.
You should use the `err.name` to check for the type of your error.

## What about stack trace

Stack trace is maintained inside a physical boundary, just like `Error` does.
But for security reason, stack trace does not propagate over physical boundary.

If you think about it, stack trace is useful only to your team who orignate the error.
Your consumer should not know or care about the stack trace.
They contains information about the internal structure of your package and is fragile.

To provide a humanly understandable trace of the error cause chain,
you should do that through the `errors` property.

[circleci-image]: https://circleci.com/gh/unional/iso-error/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/iso-error/tree/master
[codacy-image]: https://api.codacy.com/project/badge/Grade/569e678c65cf4481a172aaeb83b41aef
[codacy-url]: https://www.codacy.com/app/homawong/iso-error?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=unional/iso-error&amp;utm_campaign=Badge_Grade
[codecov-image]: https://codecov.io/gh/unional/iso-error/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/iso-error
[coveralls-image]: https://coveralls.io/repos/github/unional/iso-error/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/iso-error
[downloads-image]: https://img.shields.io/npm/dm/iso-error.svg?style=flat
[downloads-url]: https://npmjs.org/package/iso-error
[greenkeeper-image]: https://badges.greenkeeper.io/unional/iso-error.svg
[greenkeeper-url]: https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/iso-error.svg?style=flat
[npm-url]: https://npmjs.org/package/iso-error
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[travis-image]: https://travis-ci.com/unional/iso-error.svg?branch=master
[travis-url]: https://travis-ci.com/unional/iso-error?branch=master
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
