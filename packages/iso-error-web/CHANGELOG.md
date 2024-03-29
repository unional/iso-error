# iso-error-web

## 2.4.1

### Patch Changes

- 42df780: Relax the type of `HttpStatusText` to `Record<number, string>`.
  This allows user to use it by passing in an `number`:

  ```ts

  // `Response['status']: number`
  const response: Response = await fetch(...)

  const status = HttpStatusText[response.status]
  ```

## 2.4.0

### Minor Changes

- 430aa8f: Add HttpStatusText map

## 2.3.4

### Patch Changes

- 9d56e0f: Adjust or add back `main` export.

  Allow older systems which does not support `exports` field to use the module.

- Updated dependencies [9d56e0f]
  - iso-error@6.0.3

## 2.3.3

### Patch Changes

- 33ccdb0: Improve code quality with newer typescript settings.

  Improve `exports` field.

- Updated dependencies [33ccdb0]
  - iso-error@6.0.2

## 2.3.2

### Patch Changes

- Updated dependencies [c4a4701]
  - iso-error@6.0.1

## 2.3.1

### Patch Changes

- 4dc76ff: Fix module name for `HttpError`.
  It should be `iso-error-web/http`

## 2.3.0

### Minor Changes

- cde80f1: Export plugin as named export.

## 2.2.1

### Patch Changes

- Updated dependencies [8f6e39e]
  - iso-error@6.0.0

## 2.2.0

### Minor Changes

- 7725f6c: Add remaining errors

## 2.1.1

### Patch Changes

- Updated dependencies [84fc334]
  - iso-error@5.0.2

## 2.1.0

### Minor Changes

- 40f0213: Add `webPlugin`.
  Using the `webPlugin`,
  We can deserialize the err supporting `instanceOf`

## 2.0.1

### Patch Changes

- Updated dependencies [ca454a5]
  - iso-error@5.0.1

## 2.0.0

### Major Changes

- 2c2798f: `CJS` code upgrade to `ES2015` to support private fields.

### Patch Changes

- Updated dependencies [2c2798f]
- Updated dependencies [74adb0d]
- Updated dependencies [2c2798f]
  - iso-error@5.0.0

## 1.0.15

### Patch Changes

- 936d275: Fix CJS usage by adding cjs/package.json
- Updated dependencies [936d275]
  - iso-error@4.4.1

## 1.0.14

### Patch Changes

- Updated dependencies [19ecd12]
  - iso-error@4.4.0

## 1.0.13

### Patch Changes

- 44efe9d: Loosen workspace deps to `^workspace:*`

## 1.0.12

### Patch Changes

- 12b6beb: re-release for workspace resolution
- Updated dependencies [12b6beb]
  - iso-error@4.3.8

## 1.0.11

### Patch Changes

- 028438d: fix workspace protocol
- Updated dependencies [028438d]
  - iso-error@4.3.7

## 1.0.10

### Patch Changes

- Updated dependencies [f2e1629]
  - iso-error@4.3.6

## 1.0.8

### Patch Changes

- e27a828: Fix `iso-error` versioning

## 1.0.7

### Patch Changes

- Updated dependencies [d55dc6a]
  - iso-error@4.3.5

## 1.0.6

### Patch Changes

- 70d94e7: Add cjs package.json workaround
- Updated dependencies [70d94e7]
  - iso-error@4.3.4

## 1.0.5

### Patch Changes

- Updated dependencies
  - iso-error@4.3.3

## 1.0.4

### Patch Changes

- re-release
- Updated dependencies
  - iso-error@4.3.2

## 1.0.3

### Patch Changes

- 4817de0: add d.ts for cjs
- Updated dependencies [4817de0]
  - iso-error@4.3.1

## 1.0.1

### Patch Changes

- d369043: re-release due to `workspace:*` not replaced.

## 1.0.0

### Major Changes

- 152e54d: Initial release.

  `iso-error-web` provides web specific extensions and tools.
