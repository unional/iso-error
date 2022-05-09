---
"google-cloud-api": major
---

The implementation has been revised and updated.

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
