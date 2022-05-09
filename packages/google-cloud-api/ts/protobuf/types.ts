/**
 * This file defines types in `google.protobuf`
 * It's not complete at the moment as we are only focusing about `google.rpc.status`
 * @see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */

export namespace protobuf {

  /**
   * @see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration
   */
  export interface Duration {
    seconds: number,
    nanos: number,
  }
}
