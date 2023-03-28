---
'iso-error': patch
---

Remove usage of private fields on `SerializableConverter`.

Private field does not work with proxy,
causing issue like: https://github.com/mocktomata/mocktomata/issues/523

Since it does not gain additional benefits and there are nothing to hide,
relying on `private` modifier in TypeScript is suffice.

The `IsoError` still have some static private fields, but should not affect anything.
