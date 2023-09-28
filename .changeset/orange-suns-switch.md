---
'iso-error-google-cloud-api': major
---

`google.rpc.Status` should be wrapped inside an `error` field.

According to [Google Cloud API Errors > HTTP Mapping](https://cloud.google.com/apis/design/errors#http_mapping):

```protobuf
// This message defines the error schema for Google's JSON HTTP APIs.
message Error {
  // Deprecated. This message is only used by error format v1.
  message ErrorProto {}
  // This message has the same semantics as `google.rpc.Status`. It uses HTTP
  // status code instead of gRPC status code. It has extra fields `status` and
  // `errors` for backward compatibility with [Google API Client
  // Libraries](https://developers.google.com/api-client-library).
  message Status {
    // The HTTP status code that corresponds to `google.rpc.Status.code`.
    int32 code = 1;
    // This corresponds to `google.rpc.Status.message`.
    string message = 2;
    // Deprecated. This field is only used by error format v1.
    repeated ErrorProto errors = 3;
    // This is the enum version for `google.rpc.Status.code`.
    google.rpc.Code status = 4;
    // This corresponds to `google.rpc.Status.details`.
    repeated google.protobuf.Any details = 5;
  }
  // The actual error payload. The nested message structure is for backward
  // compatibility with [Google API Client
  // Libraries](https://developers.google.com/api-client-library). It also
  // makes the error more readable to developers.
  Status error = 1;
}
```
