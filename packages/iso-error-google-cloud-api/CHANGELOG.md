# iso-error-google-cloud-api

## 5.2.6

### Patch Changes

- Updated dependencies [2fd15b8]
  - google-cloud-api@4.1.1

## 5.2.5

### Patch Changes

- Updated dependencies [39fd27c]
- Updated dependencies [7cccde8]
  - google-cloud-api@4.1.0

## 5.2.4

### Patch Changes

- 9d56e0f: Adjust or add back `main` export.

  Allow older systems which does not support `exports` field to use the module.

  - google-cloud-api@4.0.8

## 5.2.3

### Patch Changes

- 33ccdb0: Improve code quality with newer typescript settings.

  Improve `exports` field.

- Updated dependencies [33ccdb0]
  - google-cloud-api@4.0.7

## 5.2.2

### Patch Changes

- google-cloud-api@4.0.6

## 5.2.1

### Patch Changes

- Updated dependencies [e7606b6]
  - google-cloud-api@4.0.5

## 5.2.0

### Minor Changes

- cde80f1: Export plugin as named export.

## 5.1.0

### Minor Changes

- 003cf8d: Re-export `google-cloud-api`.
  So now consumer can get code in `google-cloud-api` directly from `iso-error-google-cloud-api`.

  This ensure the same version is being used.

  If not, the serialization might fail due to version mismatch,
  and `instanceof` check will fail.

### Patch Changes

- Updated dependencies [003cf8d]
  - google-cloud-api@4.0.4

## 5.0.4

### Patch Changes

- google-cloud-api@4.0.3

## 5.0.3

### Patch Changes

- google-cloud-api@4.0.2

## 5.0.2

### Patch Changes

- 29bd0ce: rename `plugin`

## 5.0.1

### Patch Changes

- google-cloud-api@4.0.1

## 5.0.0

### Major Changes

- 2c2798f: `CJS` code upgrade to `ES2015` to support private fields.

### Patch Changes

- Updated dependencies [2c2798f]
  - google-cloud-api@4.0.0

## 4.0.1

### Patch Changes

- 936d275: Fix CJS usage by adding cjs/package.json
- Updated dependencies [936d275]
  - google-cloud-api@3.2.6

## 4.0.0

### Patch Changes

- Updated dependencies [19ecd12]
- Updated dependencies [809b7c3]
- Updated dependencies [59b3b72]
  - iso-error@4.4.0
  - google-cloud-api@3.2.5

## 3.0.16

### Patch Changes

- Updated dependencies [601c5b8]
- Updated dependencies [2b0a93c]
  - google-cloud-api@3.2.4

## 3.0.15

### Patch Changes

- 44efe9d: Loosen workspace deps to `^workspace:*`
- Updated dependencies [44efe9d]
  - google-cloud-api@3.2.3

## 3.0.14

### Patch Changes

- 12b6beb: re-release for workspace resolution
- Updated dependencies [12b6beb]
  - iso-error@4.3.8
  - google-cloud-api@3.2.2

## 3.0.13

### Patch Changes

- 028438d: fix workspace protocol
- Updated dependencies [028438d]
  - google-cloud-api@3.2.1
  - iso-error@4.3.7

## 3.0.12

### Patch Changes

- Updated dependencies [ceacf3f]
- Updated dependencies [c390c90]
- Updated dependencies [fbb9aa9]
  - google-cloud-api@3.2.0

## 3.0.11

### Patch Changes

- Updated dependencies [a1aab90]
  - google-cloud-api@3.1.11

## 3.0.10

### Patch Changes

- Updated dependencies [f2e1629]
  - iso-error@4.3.6
  - google-cloud-api@3.1.10

## 3.0.8

### Patch Changes

- e27a828: Fix `iso-error` versioning
- Updated dependencies [e27a828]
  - google-cloud-api@3.1.8

## 3.0.7

### Patch Changes

- Updated dependencies [d55dc6a]
  - iso-error@4.3.5
  - google-cloud-api@3.1.7

## 3.0.6

### Patch Changes

- 70d94e7: Add cjs package.json workaround
- Updated dependencies [70d94e7]
  - google-cloud-api@3.1.6
  - iso-error@4.3.4

## 3.0.5

### Patch Changes

- Updated dependencies
  - iso-error@4.3.3
  - google-cloud-api@3.1.5

## 3.0.4

### Patch Changes

- re-release
- Updated dependencies
  - google-cloud-api@3.1.4
  - iso-error@4.3.2

## 3.0.3

### Patch Changes

- 4817de0: add d.ts for cjs
- Updated dependencies [4817de0]
  - google-cloud-api@3.1.3
  - iso-error@4.3.1

## 3.0.1

### Patch Changes

- d369043: re-release due to `workspace:*` not replaced.
- Updated dependencies [d369043]
  - google-cloud-api@3.1.1

## 3.0.0

### Minor Changes

- 7758090: add ESM support

### Patch Changes

- Updated dependencies [ab570ca]
- Updated dependencies [fa5c192]
  - iso-error@4.3.0
  - google-cloud-api@3.1.0

## 2.0.0

### Major Changes

- 087cf23: Update to `google-cloud-api@3.0.0`.
  Update to `iso-error@4.0.0`

### Patch Changes

- Updated dependencies [adb8b0c]
- Updated dependencies [78489f2]
  - iso-error@4.2.0
  - google-cloud-api@3.0.0
