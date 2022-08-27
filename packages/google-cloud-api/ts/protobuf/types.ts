/**
 * This file defines types in `google.protobuf`
 * It's not complete at the moment as we are only focusing about `google.rpc.status`
 * @see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */


/**
 * @see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration
 */
export interface Duration {
  seconds: number,
  nanos: number,
}

/**
 * @see https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/timestamp.proto
 */
export interface Timestamp {
  seconds: number,
  nanos: number
}

/**
 * @see https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto
 */
export interface Struct {
  fields: Record<string, string>
}

/**
 * @see https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto
 */
export type Value = NullValue | number | string | boolean | Struct | ListValue

/**
 * @see https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto
 */
export enum NullValue {
  NULL_VALUE = 0
}

/**
 * @see https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/struct.proto
 */
export type ListValue = Array<Value>
