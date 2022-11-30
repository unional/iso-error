---
"iso-error": patch
---

Improve `cause` support with [mocktomata](https://github.com/mocktomata/mocktomata).

Remove usage of `instanceOf IsoError` in `toIsoError()`,
so that serialized error works the same as original error.

And flip to use `err.name` over `err.constructor.name` as that is actually more correct.

Have encountered a case (with [axios](https://github.com/axios/axios)) where `err.constructor.name` is empty.


