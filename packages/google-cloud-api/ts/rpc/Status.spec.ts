import { omit } from 'type-plus'
import { Aborted, AlreadyExists, Cancelled, DataLoss, DeadlineExceeded, FailedPrecondition, GoogleCloudApiError, InternalError, InvalidArgument, NotFound, OutOfRange, PermissionDenied, ResourceExhausted, rpc, Unauthenticated, Unavailable, Unimplemented, UnknownError } from '..'
import { getStatusExample } from '../test-utils'
import { statusToError } from './Status'

describe('isStatus', () => {
  const validStatus = {
    code: 4,
    message: 'some message',
    details: []
  }

  test('missing code is not ErrorStatus', () => {
    expect(rpc.isStatus(omit(validStatus, 'code'))).toBeFalsy()
  })

  test('missing message is not ErrorStatus', () => {
    expect(rpc.isStatus(omit(validStatus, 'message'))).toBeFalsy()
  })

  test('missing details is not ErrorStatus', () => {
    expect(rpc.isStatus(omit(validStatus, 'details'))).toBeFalsy()
  })

  test('minimum error status', () => {
    expect(rpc.isStatus(validStatus)).toBeTruthy()
  })
})

describe('statusToError', () => {
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
    expect(statusToError(getStatusExample(code as number)!)).toBeInstanceOf(c)
  })

  test('unknown code converts to base GoogleCloudApiError', () => {
    expect(statusToError({
      code: 123,
      message: '',
      details: []
    })).toBeInstanceOf(GoogleCloudApiError)
  })
})
