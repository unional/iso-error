import { ErrorCode, getHttpStatus } from './ErrorCode'

describe('getHttpStatus()', () => {
  test.each([
    ['OK', ErrorCode.OK, 200],
    ['CANCELLED', ErrorCode.CANCELLED, 499],
    ['UNKNOWN', ErrorCode.UNKNOWN, 500],
    ['INVALID_ARGUMENT', ErrorCode.INVALID_ARGUMENT, 400],
    ['DEADLINE_EXCEEDED', ErrorCode.DEADLINE_EXCEEDED, 504],
    ['NOT_FOUND', ErrorCode.NOT_FOUND, 404],
    ['ALREADY_EXISTS', ErrorCode.ALREADY_EXISTS, 409],
    ['PERMISSION_DENIED', ErrorCode.PERMISSION_DENIED, 403],
    ['RESOURCE_EXHAUSTED', ErrorCode.RESOURCE_EXHAUSTED, 429],
    ['FAILED_PRECONDITION', ErrorCode.FAILED_PRECONDITION, 400],
    ['ABORTED', ErrorCode.ABORTED, 409],
    ['OUT_OF_RANGE', ErrorCode.OUT_OF_RANGE, 400],
    ['UNIMPLEMENTED', ErrorCode.UNIMPLEMENTED, 501],
    ['INTERNAL', ErrorCode.INTERNAL, 500],
    ['UNAVILABLE', ErrorCode.UNAVILABLE, 503],
    ['DATA_LOSS', ErrorCode.DATA_LOSS, 500],
    ['UNAUTHENTICATED', ErrorCode.UNAUTHENTICATED, 401],
  ])(`convert valid code '%s' (%d) to HttpStatus code (%d)`, (_name, code, http) => {
    expect(getHttpStatus(code as number)).toEqual(http)
  })
  test('unknown code returns 500', () => {
    expect(getHttpStatus(123)).toBe(500)
  })
})
