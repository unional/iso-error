# Google Cloud Design

- <https://cloud.google.com/apis/design/>

## Errors

We follows the error model of the Google Cloud Design.

- <https://cloud.google.com/apis/design/errors>

Here is a summary of it.

This is the error model:

```go
package google.rpc;

message Status {
  // A simple error code that can be easily handled by the client. The
  // actual error code is defined by `google.rpc.Code`.
  int32 code = 1;

  // A developer-facing human-readable error message in English. It should
  // both explain the error and offer an actionable resolution to it.
  string message = 2;

  // Additional error information that the client code can use to handle
  // the error, such as retry delay or a help link.
  repeated google.protobuf.Any details = 3;
}
```

The `google.rpc.Code` is an enum that can be mapped to a subset of HTTP status code:
<https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto>

```ts
enum Code {
  OK, // 200 OK
  CANCELLED, // 499 Client Closed Request
  UNKNOWN, // 500 Internal Server Error
  INVALID_ARGUMENT, // 400 Bad Request
  DEADLINE_EXCEEDED, // 504 Gateway Timeout
  NOT_FOUND, // 404 Not Found
  ALREADY_EXISTS, // 409 Conflict
  PERMISSION_DENIED, // 403 Forbidden
  UNAUTHENTICATED, // 401 Unauthorized
  RESOURCE_EXHAUSED, // 429 Too Many Requests
  FAILED_PRECONDITION, // 400 Bad Request
  ABORTED, // 409 Conflict
  OUT_OF_RANGE, // 400 Bad Request
  UNIMPLEMENTED, // 501 Not Implemented
  INTERNAL, // 500 Internal Server Error
  UNAVAILABLE, // 503 Service Unavailable
  DATA_LOSS // 500 Internal Server Error
}
```

It discourages adding more code to the enum as it would affect interoperability and introduce breaking changes
(i.e. a form of Interface Segregation Principle violation).

The `details` field is an array of `error_details` object defined in
<https://github.com/googleapis/googleapis/blob/master/google/rpc/error_details.proto>.

Certain error details are applicable to particular error codes.
Some examples are here:

- <https://cloud.google.com/apis/design/errors#error_details>

The system is quite flexible and adding addition detail types are possible.
