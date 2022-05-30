# iso-error

## 4.3.1

### Patch Changes

- 4817de0: add d.ts for cjs

## 4.3.0

### Minor Changes

- ab570ca: Adding ESM Module support.
  Removing extra ts files in the package.

## 4.2.0

### Minor Changes

- adb8b0c: Add `isAggregateError()` helper function.

  This is used to support the `error-cause` standard.
  Since applying the `error-cause` standard to `AggregateError` is problematic,
  providing this function helps to handle this special case.

  This function will check by shape instead of using `instanceof`,
  which does not work with polyfill and other circumstances.

  Improve `AggregateError` support on NodeJS 14
