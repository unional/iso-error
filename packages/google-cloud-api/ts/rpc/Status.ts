import { Aborted, AlreadyExists, Cancelled, DataLoss, DeadlineExceeded, FailedPrecondition, GoogleCloudApiError, InternalError, InvalidArgument, NotFound, OutOfRange, PermissionDenied, ResourceExhausted, Unauthenticated, Unavailable, Unimplemented, UnknownError } from '../errors.js'
import { Status } from './types.js'

export function isStatus(input: any): input is Status {
  return typeof input === 'object' &&
    typeof input.code === 'number' &&
    typeof input.message === 'string' &&
    Array.isArray(input.details)
}

export function statusToError(obj: Status) {
  switch (obj.code) {
    case 1: return new Cancelled(obj)
    case 2: return new UnknownError(obj)
    case 3: return new InvalidArgument(obj as any)
    case 4: return new DeadlineExceeded(obj)
    case 5: return new NotFound(obj as any)
    case 6: return new AlreadyExists(obj as any)
    case 7: return new PermissionDenied(obj as any)
    case 8: return new ResourceExhausted(obj as any)
    case 9: return new FailedPrecondition(obj as any)
    case 10: return new Aborted(obj as any)
    case 11: return new OutOfRange(obj as any)
    case 12: return new Unimplemented(obj as any)
    case 13: return new InternalError(obj)
    case 14: return new Unavailable(obj)
    case 15: return new DataLoss(obj)
    case 16: return new Unauthenticated(obj)
    default: return new GoogleCloudApiError(obj)
  }
}
