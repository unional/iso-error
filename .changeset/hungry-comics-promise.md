---
"iso-error": major
---

Adjust `ErrorWithCause` to match `ES2022` definition.

standard type `ES2022` adds `cause?: unknown` to the `Error` type.

It is not compatiable with the more restricted `cause?: Error`.

So we need to adjust `ErrorWithCause` to match `ES2022` definition.
