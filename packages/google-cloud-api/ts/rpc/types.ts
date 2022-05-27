/**
 * This file defines types in `google.rpc`
 * @see https://github.com/googleapis/googleapis/tree/master/google/rpc
 */

import { protobuf } from '../protobuf/types.js'

export interface RetryInfo {
  '@type': 'type.googleapis.com/google.rpc.RetryInfo',
  retry_delay: protobuf.Duration,
}

export interface DebugInfo {
  '@type': 'type.googleapis.com/google.rpc.DebugInfo',
  stack_entries: string[],
  detail: string,
}

export namespace QuotaFailure {
  export interface Violation {
    subject: string,
    description: string,
  }
}

export interface QuotaFailure {
  '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
  violations: QuotaFailure.Violation[],
}

export interface ErrorInfo {
  '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
  reason: string,
  domain: string,
  metadata: Record<string, string>
}

export namespace PreconditionFailure {
  export interface Violation {
    type: string,
    subject: string,
    description: string,
  }
}

export interface PreconditionFailure {
  '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
  violations: PreconditionFailure.Violation[],
}

export namespace BadRequest {
  export interface FieldViolation {
    field: string,
    description: string,
  }
}

export interface BadRequest {
  '@type': 'type.googleapis.com/google.rpc.BadRequest',
  field_violations: BadRequest.FieldViolation[],
}

export interface RequestInfo {
  '@type': 'type.googleapis.com/google.rpc.RequestInfo',
  request_id: string,
  serving_data: string,
}

export interface ResourceInfo {
  '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
  resource_type: string,
  resource_name: string,
  owner: string,
  description: string,
}

export namespace Help {
  export interface Link {
    description: string,
    url: string,
  }
}

export interface Help {
  '@type': 'type.googleapis.com/google.rpc.Help',
  links: Help.Link[],
}

export interface LocalizedMessage {
  '@type': 'type.googleapis.com/google.rpc.LocalizedMessage',
  locale: string,
  message: string,
}

/**
 * Extended message protocol about permission
 */
export interface PermissionInfo {
  '@type': 'google-cloud-api/PermissionInfo',
  resource_type: string,
  resource_name: string,
  permission: string,
}

/**
 * Extended message protocol about method
 */
export interface MethodInfo {
  '@type': 'google-cloud-api/MethodInfo',
  method_name: string
}

export namespace CauseInfo {
  export interface Cause {
    message: string,
    causes?: Cause[],
  }
}

/**
 * Extendend message protocol about cause of error
 */
export interface CauseInfo extends CauseInfo.Cause {
  '@type': 'google-cloud-api/CauseInfo',
}

export type Detail = DebugInfo | RequestInfo | ResourceInfo | Help | LocalizedMessage | PermissionInfo | MethodInfo | CauseInfo | GenericDetail

export interface GenericDetail {
  '@type': string,
  [k: string]: any
}

export interface Status<D extends Detail[] = Detail[]> {
  code: number,
  message: string,
  details: D
}
