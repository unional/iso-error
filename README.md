# iso-error

![unstable][unstable-image]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

A isomorphic error library.


```ts
import { IsoError } from 'iso-error'

const response = await fetch('...')

if (response.status !== 200) {
  throw IsoError.parse(await response.text())
}
```

## Contribute

```sh
# after fork and clone
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

[circleci-image]: https://circleci.com/gh/unional/iso-error/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/iso-error/tree/master
[codecov-image]: https://codecov.io/gh/unional/iso-error/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/iso-error
[coveralls-image]: https://coveralls.io/repos/github/unional/iso-error/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/unional/iso-error?branch=master
[downloads-image]: https://img.shields.io/npm/dm/iso-error.svg?style=flat
[downloads-url]: https://npmjs.org/package/iso-error
[greenkeeper-image]: https://badges.greenkeeper.io/unional/iso-error.svg
[greenkeeper-url]: https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/iso-error.svg?style=flat
[npm-url]: https://npmjs.org/package/iso-error
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[travis-image]: https://img.shields.io/travis/unional/iso-error/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/iso-error?branch=master
[unstable-image]: https://img.shields.io/badge/stability-unstable-yellow.svg
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
