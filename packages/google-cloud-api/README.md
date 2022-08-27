# google-cloud-api

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Codecov][codecov-image]][codecov-url]

A TypeScript implementation of [Google Cloud API design].

This package provides some additional definitions,
most notably:

- `google-cloud-api/CauseInfo`: alternative for `type.googleapis.com/google.rpc.DebugInfo`,\
  providing better security and traceability.
- `getCauseInfo(error)` get `google-cloud-api/CauseInfo` from any error.

[Google Cloud API design]: https://cloud.google.com/apis/design/
[codecov-image]: https://codecov.io/gh/unional/google-cloud-api/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/google-cloud-api
[downloads-image]: https://img.shields.io/npm/dm/google-cloud-api.svg?style=flat
[downloads-url]: https://npmjs.org/package/google-cloud-api
[npm-image]: https://img.shields.io/npm/v/google-cloud-api.svg?style=flat
[npm-url]: https://npmjs.org/package/google-cloud-api
