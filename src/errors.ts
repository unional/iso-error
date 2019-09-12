import { ModuleError } from 'iso-error';
import { required, RequiredPick } from 'type-plus'
import { BadRequest, DebugInfo, ErrorDetail, Help, LocalizedMessage, RequestInfo, PreconditionFailure } from './types';

export type ErrorOptions<D extends ErrorDetails = ErrorDetails> = {
  message: string,
  details?: D
}
export type ErrorDetails = Array<RequestInfo | Help | LocalizedMessage | ErrorDetail>

export class GoogleCloudApiError<
  D extends ErrorDetails = ErrorDetails
  > extends ModuleError {
  details: D
  constructor({ message, details }: ErrorOptions<D>, ...errors: Error[]) {
    super('google-cloud-api', message, ...errors)

    this.details = details || [] as any
  }

  getDebugInfo(detail?: string): DebugInfo | undefined {
    if (!this.stack) return undefined

    const stack_entries = this.stack.split('\n')
    return {
      '@type': 'type.googleapis.com/google.rpc.DebugInfo',
      stack_entries,
      detail: detail || this.message
    }
  }
}

export class Cancelled extends GoogleCloudApiError {
  constructor(options?: Partial<ErrorOptions>, ...errors: Error[]) {
    super(required({ message: 'Request cancelled by the client.' }, options), ...errors)
  }
}

export class InvalidArgument extends GoogleCloudApiError<[BadRequest, ...(RequestInfo | Help | LocalizedMessage)[]]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[BadRequest, ...(RequestInfo | Help | LocalizedMessage)[]]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatInvalidArgumentMessage(options.details[0]) }, options), ...errors)
  }
}

function formatInvalidArgumentMessage(badRequest: BadRequest) {
  if (badRequest.field_violations.length > 1) {
    return 'Multiple invalid arguments, please see details.'
  }
  return badRequest.field_violations[0].description
}

export class FailedPrecondition extends GoogleCloudApiError<[PreconditionFailure, ...(RequestInfo | Help | LocalizedMessage)[]]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[PreconditionFailure, ...(RequestInfo | Help | LocalizedMessage)[]]>>, 'details'>, ...errors: Error[]) {
    super(required({ message: formatFailedPreconditionMessage(options.details[0]) }, options), ...errors)
  }
}

function formatFailedPreconditionMessage(badRequest: PreconditionFailure) {
  if (badRequest.violations.length > 1) {
    return 'Multiple precondition failures, please see details.'
  }
  return badRequest.violations[0].description
}

export class OutOfRange extends GoogleCloudApiError<[BadRequest, ...(RequestInfo | Help | LocalizedMessage)[]]> {
  constructor(options: RequiredPick<Partial<ErrorOptions<[BadRequest, ...(RequestInfo | Help | LocalizedMessage)[]]>>, 'details'>, ...errors: Error[]) {
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
