import { Aborted, AlreadyExists, Cancelled, DataLoss, DeadlineExceeded, FailedPrecondition, fromErrorStatus, InternalError, InvalidArgument, NotFound, OutOfRange, PermissionDenied, ResourceExhausted, Unauthenticated, Unavailable, Unimplemented, UnknownError } from '.'
import { getStatusExample } from './test-utils'
import { GoogleCloudApiError } from './errors'
test.each([
  [1, 'Cancelled', Cancelled],
  [3, 'InvalidArgument', InvalidArgument],
  [2, 'UnknownError', UnknownError],
  [4, 'DeadlineExceeded', DeadlineExceeded],
  [5, 'NotFound', NotFound],
  [6, 'AlreadyExists', AlreadyExists],
  [7, 'PermissionDenied', PermissionDenied],
  [8, 'ResourceExhausted', ResourceExhausted],
  [9, 'FailedPrecondition', FailedPrecondition],
  [10, 'Aborted', Aborted],
  [11, 'OutOfRange', OutOfRange],
  [12, 'Unimplemented', Unimplemented],
  [13, 'InternalError', InternalError],
  [14, 'Unavailable', Unavailable],
  [15, 'DataLoss', DataLoss],
  [16, 'Unauthenticated', Unauthenticated],
])('status %d converts to Error %s', (code, _name, c) => {
  expect(fromErrorStatus(getStatusExample(code as number)!)).toBeInstanceOf(c)
})

test('unknown code converts to base GoogleCloudApiError', () => {
  expect(fromErrorStatus({
    code: 123,
    message: '',
    details: []
  })).toBeInstanceOf(GoogleCloudApiError)
})
