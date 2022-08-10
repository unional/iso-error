# google-cloud-api

## 3.1.11

### Patch Changes

- a1aab90: update type-plus

## 3.1.10

### Patch Changes

- Updated dependencies [f2e1629]
  - iso-error@4.3.6

## 3.1.8

### Patch Changes

- e27a828: Fix `iso-error` versioning

## 3.1.7

### Patch Changes

- Updated dependencies [d55dc6a]
  - iso-error@4.3.5

## 3.1.6

### Patch Changes

- 70d94e7: Add cjs package.json workaround
- Updated dependencies [70d94e7]
  - iso-error@4.3.4

## 3.1.5

### Patch Changes

- Updated dependencies
  - iso-error@4.3.3

## 3.1.4

### Patch Changes

- re-release
- Updated dependencies
  - iso-error@4.3.2

## 3.1.3

### Patch Changes

- 4817de0: add d.ts for cjs
- Updated dependencies [4817de0]
  - iso-error@4.3.1

## 3.1.1

### Patch Changes

- d369043: re-release due to `workspace:*` not replaced.

## 3.1.0

### Minor Changes

- fa5c192: add ESM support

### Patch Changes

- Updated dependencies [ab570ca]
  - iso-error@4.3.0

## 3.0.0

### Major Changes

- 78489f2: The implementation has been revised and updated.

  The types are moved into their respective namespace with better match the protobuf specification:

  - `Duration` → `protobuf.Duration`
  - `ErrorStatus` → `rpc.Status`
  - `RetryInfo`, etc. → `rpc.\*`

  - `isErrorStaus` → `rpc.isStatus`
  - `fromErrorStatus` → `rpc.statusToError`
  - `getCodeName` → `rpc.codeName`
  - `getHttpStatus` → `rpc.codeToHttpStatus`
  - `error.toErrorStatus` → `error.toRpcStatus`

  The constructor of the errors are updated to support `error-cause`.
  The `...errors` are removed.

  The `rpc.CauseInfo.Cause.description` is renamed to `message` to better match the error itself.
  The `rpc.CauseInfo.Cause` type is tightened to not accepting other fields.

### Patch Changes

- Updated dependencies [adb8b0c]
  - iso-error@4.2.0
