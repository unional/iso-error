export type ErrorStatus<D extends ErrorDetails = ErrorDetails> = {
  code: number,
  message: string,
  details: D,
}

export type ErrorDetails = Array<DebugInfo | RequestInfo | ResourceInfo | Help | LocalizedMessage | PermissionInfo | MethodInfo | CauseInfo | ErrorDetail>

export type Duration = {
  seconds: number,
  nanos: number,
}

export type ErrorDetail = {
  '@type': string,
  [k: string]: any
}

export type RetryInfo = {
  '@type': 'type.googleapis.com/google.rpc.RetryInfo',
  retry_delay: Duration,
}

export type DebugInfo = {
  '@type': 'type.googleapis.com/google.rpc.DebugInfo',
  stack_entries: string[],
  detail: string,
}

export namespace QuotaFailure {
  export type Violation = {
    subject: string,
    description: string,
  }
}

export type QuotaFailure = {
  '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
  violations: QuotaFailure.Violation[],
}

export namespace PreconditionFailure {
  export type Violation = {
    type: string,
    subject: string,
    description: string,
  }
}

export type PreconditionFailure = {
  '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
  violations: PreconditionFailure.Violation[],
}

export namespace BadRequest {
  export type FieldViolation = {
    field: string,
    description: string,
  }
}

export type BadRequest = {
  '@type': 'type.googleapis.com/google.rpc.BadRequest',
  field_violations: BadRequest.FieldViolation[],
}

export type RequestInfo = {
  '@type': 'type.googleapis.com/google.rpc.RequestInfo',
  request_id: string,
  serving_data: string,
}

export type ResourceInfo = {
  '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
  resource_type: string,
  resource_name: string,
  owner: string,
  description: string,
}

export namespace Help {
  export type Link = {
    description: string,
    url: string,
  }
}

export type Help = {
  '@type': 'type.googleapis.com/google.rpc.Help',
  links: Help.Link[],
}

export type LocalizedMessage = {
  '@type': 'type.googleapis.com/google.rpc.LocalizedMessage',
  locale: string,
  message: string,
}

export type PermissionInfo = {
  '@type': 'google-cloud-api/PermissionInfo',
  resource_type: string,
  resource_name: string,
  permission: string,
}

export type MethodInfo = {
  '@type': 'google-cloud-api/MethodInfo',
  method_name: string
}

export namespace CauseInfo {
  export type Cause = {
    description: string,
    causes: Cause[]
  }
}

export type CauseInfo = {
  '@type': 'google-cloud-api/CauseInfo',
  causes: CauseInfo.Cause[]
}
