import { ModuleError } from 'iso-error';
import { required, RequiredPick } from 'type-plus'
import { BadRequest, DebugInfo, ErrorDetail, Help, LocalizedMessage, RequestInfo, PreconditionFailure, PermissionInfo, ResourceInfo, QuotaFailure } from './types';

export type ErrorOptions<D extends ErrorDetails = ErrorDetails> = {
  message: string,
  /**
   * Detail message for DebugInfo
   */
  debugDetail?: string,
  details?: D
}
export type ErrorDetails = Array<RequestInfo | Help | LocalizedMessage | ErrorDetail>

export class GoogleCloudApiError<
  D extends ErrorDetails = ErrorDetails
  > extends ModuleError {
  details: D
  constructor({ message, debugDetail, details }: ErrorOptions<D>, ...errors: Error[]) {
    super('google-cloud-api', message, ...errors)

    this.details = details || [] as any
    const debugInfo = this.getDebugInfo(debugDetail || message)
    // istanbul ignore next
    if (debugInfo) this.details.push(debugInfo)
  }

  getDebugInfo(detail: string): DebugInfo | undefined {
    // istanbul ignore next
    if (!this.stack) return undefined

    const stack_entries = this.stack.split('\n')
    return {
      '@type': 'type.googleapis.com/google.rpc.DebugInfo',
      stack_entries,
      detail
    }
  }
}

export class Cancelled extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(required({ message: 'Request cancelled by the client.' }, options), ...errors)
  }
}

export class InvalidArgument extends GoogleCloudApiError<[BadRequest, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[BadRequest, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatInvalidArgumentMessage(options.details[0]) }, options), ...errors)
  }
}

function formatInvalidArgumentMessage(badRequest: BadRequest) {
  if (badRequest.field_violations.length > 1) {
    return 'Multiple invalid arguments, please see details.'
  }
  return badRequest.field_violations[0].description
}

export class FailedPrecondition extends GoogleCloudApiError<[PreconditionFailure, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[PreconditionFailure, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatFailedPreconditionMessage(options.details[0]) }, options), ...errors)
  }
}

function formatFailedPreconditionMessage(badRequest: PreconditionFailure) {
  if (badRequest.violations.length > 1) {
    return 'Multiple precondition failures, please see details.'
  }
  return badRequest.violations[0].description
}

export class OutOfRange extends GoogleCloudApiError<[BadRequest, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[BadRequest, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatOutOfRangeMessage(options.details[0]) }, options), ...errors)
  }
}

function formatOutOfRangeMessage(badRequest: BadRequest) {
  if (badRequest.field_violations.length > 1) {
    return 'Multiple out of range violations, please see details.'
  }
  return badRequest.field_violations[0].description
}

export class Unauthenticated extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(required({ message: 'Invalid authentication credentials.' }, options), ...errors)
  }
}

export class PermissionDenied extends GoogleCloudApiError<[PermissionInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[PermissionInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatPermissionDeniedMessage(options.details[0]) }, options), ...errors)
  }
}

function formatPermissionDeniedMessage(permissionInfo: PermissionInfo) {
  return `Resource '${permissionInfo.permission}' denied on ${permissionInfo.resource_type} '${permissionInfo.resource_name}'.`
}

export class NotFound extends GoogleCloudApiError<[ResourceInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[ResourceInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatNotFoundMessage(options.details[0]) }, options), ...errors)
  }
}

function formatNotFoundMessage(info: ResourceInfo) {
  return `Resource '${info.resource_name}' not found.`
}

export class Aborted extends GoogleCloudApiError<[ResourceInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[ResourceInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatAbortMessage(options.details[0]) }, options), ...errors)
  }
}

function formatAbortMessage(info: ResourceInfo) {
  return `Couldn't acquire lock on resource '${info.resource_name}'.`
}

export class AlreadyExists extends GoogleCloudApiError<[ResourceInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[ResourceInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatAlreadyExistsMessage(options.details[0]) }, options), ...errors)
  }
}

function formatAlreadyExistsMessage(info: ResourceInfo) {
  return `Resource '${info.resource_name}' already exists.`
}

export class ResourceExhausted extends GoogleCloudApiError<[QuotaFailure, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[QuotaFailure, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatResourceExhaustedMessage(options.details[0]) }, options), ...errors)
  }
}

function formatResourceExhaustedMessage(quotaFailure: QuotaFailure) {
  if (quotaFailure.violations.length > 1) {
    return 'Multiple quota violations, please see details.'
  }
  return quotaFailure.violations[0].description
}

export class DataLoss extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(required({ message: '' }, options), ...errors)
  }
}

export class UnknownError extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(required({ message: '' }, options), ...errors)
  }
}

export class InternalError extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(required({ message: '' }, options), ...errors)
  }
}
