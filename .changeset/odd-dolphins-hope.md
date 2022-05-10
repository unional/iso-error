---
"iso-error": minor
---

Add `isAggregateError()` helper function.

This is used to support the `error-cause` standard.
Since applying the `error-cause` standard to `AggregateError` is problematic,
providing this function helps to handle this special case.

This function will check by shape instead of using `instanceof`,
which does not work with polyfill and other circumstances.

Improve `AggregateError` support on NodeJS 14
