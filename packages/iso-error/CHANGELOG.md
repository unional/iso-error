# iso-error

## 6.0.1

### Patch Changes

- c4a4701: Remove usage of private fields on `SerializableConverter`.

  Private field does not work with proxy,
  causing issue like: https://github.com/mocktomata/mocktomata/issues/523

  Since it does not gain additional benefits and there are nothing to hide,
  relying on `private` modifier in TypeScript is suffice.

  The `IsoError` still have some static private fields, but should not affect anything.

## 6.0.0

### Major Changes

- 8f6e39e: Adjust `ErrorWithCause` to match `ES2022` definition.

  standard type `ES2022` adds `cause?: unknown` to the `Error` type.

  It is not compatiable with the more restricted `cause?: Error`.

  So we need to adjust `ErrorWithCause` to match `ES2022` definition.

## 5.0.2

### Patch Changes

- 84fc334: Skip field when it is circular

## 5.0.1

### Patch Changes

- ca454a5: Improve `cause` support with [mocktomata](https://github.com/mocktomata/mocktomata).

  Remove usage of `instanceOf IsoError` in `toIsoError()`,
  so that serialized error works the same as original error.

  And flip to use `err.name` over `err.constructor.name` as that is actually more correct.

  Have encountered a case (with [axios](https://github.com/axios/axios)) where `err.constructor.name` is empty.

## 5.0.0

### Major Changes

- 2c2798f: `CJS` code upgrade to `ES2015` to support private fields.
- 74adb0d: Remove `IsoError.Serializable`.

  While the concept is still there (`SerializableConverter`),
  the type is not needed because the value across physically boundary is untyped.

### Minor Changes

- 2c2798f: Add `SerializableConverter`.

## 4.4.1

### Patch Changes

- 936d275: Fix CJS usage by adding cjs/package.json

## 4.4.0

### Minor Changes

- 19ecd12: Add `ModuleError.Options` which is an alias of `IsoError.Options`.

  `IsoError.Options` is used on every error you create so adding this alias so that you don't have to import both types.

## 4.3.8

### Patch Changes

- 12b6beb: re-release for workspace resolution

## 4.3.7

### Patch Changes

- 028438d: fix workspace protocol

## 4.3.6

### Patch Changes

- f2e1629: fix: relax `fromSerializable()` type

  The `IsoError.Serializable` is too restrictive.
  Plugin may support a different serialization that remedy any restriction from `Serializable`.

  So the type does not bring much values.

## 4.3.5

### Patch Changes

- d55dc6a: Polyfill `AggregateError` type.

## 4.3.4

### Patch Changes

- 70d94e7: Add cjs package.json workaround

## 4.3.3

### Patch Changes

- Mention ES2021.promise in readme

## 4.3.2

### Patch Changes

- re-release

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
