import { IsoError, ModuleError } from 'iso-error'
import { required, RequiredPick } from 'type-plus'
import { BadRequest, CauseInfo, DebugInfo, ErrorDetails, ErrorStatus, MethodInfo, PermissionInfo, PreconditionFailure, QuotaFailure, ResourceInfo } from './types'

export type ErrorOptions<D extends ErrorDetails = ErrorDetails> = {
  message: string,
  /**
   * Detail message for DebugInfo
   */
  debugDetail?: string,
  details?: D
}

export class GoogleCloudApiError<D extends ErrorDetails = ErrorDetails> extends ModuleError {
  private debugDetail: string | undefined
  details: D
  constructor(public code: number, { message, debugDetail, details }: ErrorOptions<D>, ...errors: Error[]) {
    super('google-cloud-api', message, ...errors)

    this.details = details || [] as any
    this.debugDetail = debugDetail
  }

  toErrorStatus(): ErrorStatus<D> {
    const details = [...this.details] as D
    const debugInfo = this.getDebugInfo()
    // istanbul ignore next
    if (debugInfo) details.push(debugInfo)

    const causeInfo = this.getCauseInfo()
    if (causeInfo) details.push(causeInfo)
    return {
      code: this.code,
      message: this.message,
      details
    }
  }

  private getDebugInfo(): DebugInfo | undefined {
    // istanbul ignore next
    if (!this.stack) return undefined

    const stack_entries = this.stack.split('\n').slice(1).map(s => s.trim().slice(3))
    return {
      '@type': 'type.googleapis.com/google.rpc.DebugInfo',
      stack_entries,
      detail: this.debugDetail || this.message
    }
  }

  private getCauseInfo(): CauseInfo | undefined {
    if (!this.errors) return undefined

    return {
      '@type': 'google-cloud-api/CauseInfo',
      causes: toCauses(this.errors)
    }
  }
}

function toCauses(errors: IsoError[]): CauseInfo.Cause[] {
  return errors.map(e => ({
    description: `${e.name}: ${e.message}`,
    causes: e.errors ? toCauses(e.errors) : []
  }))
}

export class Cancelled extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(1, required({ message: 'Request cancelled by the client.' }, options), ...errors)
  }
}

export class InvalidArgument extends GoogleCloudApiError<[BadRequest, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[BadRequest, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(3, required({ message: formatBadRequestMessage(options.details[0]) }, options), ...errors)
  }
}

function formatBadRequestMessage(badRequest: BadRequest) {
  if (badRequest.field_violations.length > 1) {
    return 'Multiple invalid arguments, please see details.'
  }
  return badRequest.field_violations[0].description
}

export class FailedPrecondition extends GoogleCloudApiError<[PreconditionFailure, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[PreconditionFailure, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(9, required({ message: formatPreconditionFailureMessage(options.details[0]) }, options), ...errors)
  }
}

function formatPreconditionFailureMessage(badRequest: PreconditionFailure) {
  if (badRequest.violations.length > 1) {
    return 'Multiple precondition failures, please see details.'
  }
  return badRequest.violations[0].description
}

export class OutOfRange extends GoogleCloudApiError<[BadRequest, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[BadRequest, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(11, required({ message: formatOutOfRangeMessage(options.details[0]) }, options), ...errors)
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
    super(16, required({ message: 'Invalid authentication credentials.' }, options), ...errors)
  }
}

export class PermissionDenied extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(7, required({ message: getPermissionDeniedMessage(options && options.details) }, options), ...errors)
  }
}

function getPermissionDeniedMessage(details: ErrorDetails | undefined) {
  if (!details) return ''
  const info: PermissionInfo | undefined = details.find(d => d['@type'] === 'google-cloud-api/PermissionInfo') as any
  return info ? formatPermissionDeniedMessage(info) : ''
}

function formatPermissionDeniedMessage(permissionInfo: PermissionInfo) {
  return `Resource '${permissionInfo.permission}' denied on ${permissionInfo.resource_type} '${permissionInfo.resource_name}'.`
}

export class NotFound extends GoogleCloudApiError<[ResourceInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[ResourceInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(5, required({ message: formatNotFoundMessage(options.details[0]) }, options), ...errors)
  }
}

function formatNotFoundMessage(info: ResourceInfo) {
  return `Resource '${info.resource_name}' not found.`
}

export class Aborted extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(10, required({ message: getAbortMessage(options && options.details) }, options), ...errors)
  }
}

function getAbortMessage(details: ErrorDetails | undefined) {
  if (!details) return ''
  const info: ResourceInfo | undefined = details.find(d => d['@type'] === 'type.googleapis.com/google.rpc.ResourceInfo') as any
  return info ? formatAbortMessage(info) : ''
}

function formatAbortMessage(info: ResourceInfo) {
  return `Couldn't acquire lock on resource '${info.resource_name}'.`
}

export class AlreadyExists extends GoogleCloudApiError<[ResourceInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[ResourceInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(6, required({ message: formatAlreadyExistsMessage(options.details[0]) }, options), ...errors)
  }
}

function formatAlreadyExistsMessage(info: ResourceInfo) {
  return `Resource '${info.resource_name}' already exists.`
}

export class ResourceExhausted extends GoogleCloudApiError<[QuotaFailure, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[QuotaFailure, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(8, required({ message: formatResourceExhaustedMessage(options.details[0]) }, options), ...errors)
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
    super(15, required({ message: '' }, options), ...errors)
  }
}

export class UnknownError extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(2, required({ message: '' }, options), ...errors)
  }
}

export class InternalError extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(13, required({ message: '' }, options), ...errors)
  }
}

export class Unimplemented extends GoogleCloudApiError<[MethodInfo, ...ErrorDetails]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[MethodInfo, ...ErrorDetails]>>, 'details'>, ...errors: Error[]) {
    super(12, required({ message: formatNotImplementedMessage(options.details[0]) }, options), ...errors)
  }
}

function formatNotImplementedMessage(info: MethodInfo) {
  return `Method '${info.method_name}' not implemented.`
}

export class Unavailable extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(14, required({ message: '' }, options), ...errors)
  }
}

export class DeadlineExceeded extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(4, required({ message: '' }, options), ...errors)
  }
}
