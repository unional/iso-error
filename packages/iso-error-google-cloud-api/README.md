# iso-error-google-cloud-api

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Codecov][codecov-image]][codecov-url]

[`iso-error`](https://github.com/unional/iso-error) plugin for [Google Cloud API design](https://cloud.google.com/apis/design/).

Since [`iso-error`](https://github.com/unional/iso-error) is about sending data across physical boundary,
the `DebugInfo` is removed for security purpose.

## Install

```sh
yarn add iso-error-google-cloud-api
```

## Usage

```ts
// server
import { IsoError } from 'iso-error'
import plugin from 'iso-error-google-cloud-api'

IsoError.addPlugin(plugin)

try {
  doSomeWorkThatThrows()
}
catch (e) {
  const ge = convertToGoogleError(e)
  response.emit(IsoError.serialize(ge))
}
```

```ts
// client
import { IsoError } from 'iso-error'
import plugin from 'iso-error-google-cloud-api'

IsoError.addPlugin(plugin)

try {
  fetch('<serverUrl>').then(response => {
    if (!response.ok) {
      throw IsoError.deserialize(response.text())
    }
  })
}
```

[codecov-image]: https://codecov.io/gh/unional/iso-error-google-cloud-api/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/iso-error-google-cloud-api
[downloads-image]: https://img.shields.io/npm/dm/iso-error-google-cloud-api.svg?style=flat
[downloads-url]: https://npmjs.org/package/iso-error-google-cloud-api
[npm-image]: https://img.shields.io/npm/v/iso-error-google-cloud-api.svg?style=flat
[npm-url]: https://npmjs.org/package/iso-error-google-cloud-api
