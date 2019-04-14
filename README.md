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

A isomorphic error library.

When sending error across physical boundary,
you always need to do some custom parsing and serializing of the data.

Also, often time the error are not standard and some information are not properly serialized.

This library provide a standard error structure that can be easily serialized and parsed.

You can create your custom error by extending form `IsoError` or `ModuleError`,
and they can be parsed and thrown as normal:

```ts
import { IsoError } from 'iso-error'

const response = await fetch('...')

if (response.status !== 200) {
  throw IsoError.parse(await response.text())
}
```

One limitation remains that you cannot do `err instanceof YourError`.
But `err instanceof IsoError` and `err instanceof Error` works fine.
You should use the `err.type` to check for the type of your error.

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
