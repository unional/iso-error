# iso-error-google-cloud-api

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

[`iso-error`](https://github.com/unional/iso-error) plugin for [Google Cloud API design](https://cloud.google.com/apis/design/).

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

[circleci-image]: https://circleci.com/gh/unional/iso-error-google-cloud-api/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/iso-error-google-cloud-api/tree/master
[codacy-image]: https://api.codacy.com/project/badge/Grade/569e678c65cf4481a172aaeb83b41aef
[codacy-url]: https://www.codacy.com/app/homawong/iso-error-google-cloud-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=unional/iso-error-google-cloud-api&amp;utm_campaign=Badge_Grade
[codecov-image]: https://codecov.io/gh/unional/iso-error-google-cloud-api/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/iso-error-google-cloud-api
[coveralls-image]: https://coveralls.io/repos/github/unional/iso-error-google-cloud-api/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/unional/iso-error-google-cloud-api?branch=master
[downloads-image]: https://img.shields.io/npm/dm/iso-error-google-cloud-api.svg?style=flat
[downloads-url]: https://npmjs.org/package/iso-error-google-cloud-api
[greenkeeper-image]: https://badges.greenkeeper.io/unional/iso-error-google-cloud-api.svg
[greenkeeper-url]: https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/iso-error-google-cloud-api.svg?style=flat
[npm-url]: https://npmjs.org/package/iso-error-google-cloud-api
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[travis-image]: https://travis-ci.com/unional/iso-error-google-cloud-api.svg?branch=master
[travis-url]: https://travis-ci.com/unional/iso-error-google-cloud-api?branch=master
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
