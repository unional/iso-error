# google-cloud-api

## 7.0.0

### Major Changes

- 5bba9a9: Update filenames to add the `error` category.

  Add examples for the errors.

## 6.0.0

### Major Changes

- c1efc1d: Flatten spec.

  The updated folder-based spec does not work well when used.
  It creates conflicting schema names between `code/*` and `status/*`.

  Also, the naming scheme of `error~any-of` and `error=aborted` create invalid key per OpenAPI spec.

  They are now replaced with `-`.
  Although it missed some meaning, that's a compromise need to be made.

## 5.2.1

### Patch Changes

- b8eee47: Add missing `oneOf` entries for `code` and `status`.

## 5.2.0

### Minor Changes

- 4feedbf: Adding folder based specs, with separated code/status/message/details so they can be reused separately.

## 5.1.0

### Minor Changes

- ca2efb4: Add `google_cloud_api.any-of.yaml` for reuse.
  This is useful for some API that wants to keep the error generic,
  or before the details are flushed out.

## 5.0.0

### Major Changes

- 13e7538: Add missing `status` in the data structure:

  ```ts
  {
    error: {
      code: number,
      status: string, // new
      message: string,
      details: Details[]
    }
  }
  ```

  This `status` is mentioned in the [Google Cloud APIs documentation](https://cloud.google.com/apis/docs/errors) ([example](https://translate.googleapis.com/language/translate/v2?key=invalid&q=hello&source=en&target=es&format=text&$.xgafv=2)) but was not added before.

  Since this change adds a new required/expected field. This is a breaking change.

## 4.1.1

### Patch Changes

- 2fd15b8: Add required fields for responses.
  This is not a breaking change as it is a `out` field changes.

## 4.1.0

### Minor Changes

- 7cccde8: Refactor OpenApi specs.

  paths, responses, schemas are now in separate files.

  The overall spec example still needs to be updated.
  e.g. updating each case to show which http status code is appropriate.

### Patch Changes

- 39fd27c: Improve `toCauses()` logic so that it does not need `as any`.

## 4.0.8

### Patch Changes

- Updated dependencies [9d56e0f]
  - iso-error@6.0.3

## 4.0.7

### Patch Changes

- 33ccdb0: Improve code quality with newer typescript settings.

  Improve `exports` field.

- Updated dependencies [33ccdb0]
  - iso-error@6.0.2

## 4.0.6

### Patch Changes

- Updated dependencies [c4a4701]
  - iso-error@6.0.1

## 4.0.5

### Patch Changes

- e7606b6: Fix constructor options for some of the errors.

  The `options` should be optional.

## 4.0.4

### Patch Changes

- 003cf8d: Add MIT license to the api spec

## 4.0.3

### Patch Changes

- Updated dependencies [8f6e39e]
  - iso-error@6.0.0

## 4.0.2

### Patch Changes

- Updated dependencies [84fc334]
  - iso-error@5.0.2

## 4.0.1

### Patch Changes

- Updated dependencies [ca454a5]
  - iso-error@5.0.1

## 4.0.0

### Major Changes

- 2c2798f: `CJS` code upgrade to `ES2015` to support private fields.

### Patch Changes

- Updated dependencies [2c2798f]
- Updated dependencies [74adb0d]
- Updated dependencies [2c2798f]
  - iso-error@5.0.0

## 3.2.6

### Patch Changes

- 936d275: Fix CJS usage by adding cjs/package.json
- Updated dependencies [936d275]
  - iso-error@4.4.1

## 3.2.5

### Patch Changes

- 809b7c3: fix: add `@types` to error details
- 59b3b72: fix: allow additional properties for `CauseInfo.Causes`
- Updated dependencies [19ecd12]
  - iso-error@4.4.0

## 3.2.4

### Patch Changes

- 601c5b8: Fix google.rpc.ErrorDetails schema
- 2b0a93c: Remove extra response

## 3.2.3

### Patch Changes

- 44efe9d: Loosen workspace deps to `^workspace:*`

## 3.2.2

### Patch Changes

- 12b6beb: re-release for workspace resolution
- Updated dependencies [12b6beb]
  - iso-error@4.3.8

## 3.2.1

### Patch Changes

- 028438d: fix workspace protocol
- Updated dependencies [028438d]
  - iso-error@4.3.7

## 3.2.0

### Minor Changes

- ceacf3f: Add definition for `Cause.module`
- c390c90: add Open API spec for `google-cloud-api`, protobuf, and RPC
- fbb9aa9: expose `getCauseInfo(error)`

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
