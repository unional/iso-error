# iso-error-web

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Codecov][codecov-image]][codecov-url]

[`iso-error`] web extension.

This library contains common errors and utility for web application.

## Install

```sh
yarn add iso-error-web
```

## Usage

```ts
import { createHttpError, HttpStatus } from 'iso-error-web'

const error = createHttpError(HttpStatus.BadRequest, 'message', optionalIsoErrorOption)
```

[`iso-error`]: https://github.com/unional/iso-error/tree/main/packages/iso-error
[codecov-image]: https://codecov.io/gh/unional/iso-error-web/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/iso-error-web
[downloads-image]: https://img.shields.io/npm/dm/iso-error-web.svg?style=flat
[downloads-url]: https://npmjs.org/package/iso-error-web
[npm-image]: https://img.shields.io/npm/v/iso-error-web.svg?style=flat
[npm-url]: https://npmjs.org/package/iso-error-web
