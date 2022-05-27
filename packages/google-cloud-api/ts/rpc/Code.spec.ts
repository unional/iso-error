import { rpc } from '../rpc/index.js'

describe('getCodeName()', () => {
  test.each<[number, string]>([
    [1, 'CANCELLED'],
    [2, 'UNKNOWN'],
    [3, 'INVALID_ARGUMENT'],
    [4, 'DEADLINE_EXCEEDED'],
    [5, 'NOT_FOUND'],
    [6, 'ALREADY_EXISTS'],
    [7, 'PERMISSION_DENIED'],
    [8, 'RESOURCE_EXHAUSTED'],
    [9, 'FAILED_PRECONDITION'],
    [10, 'ABORTED'],
    [11, 'OUT_OF_RANGE'],
    [12, 'UNIMPLEMENTED'],
    [13, 'INTERNAL'],
    [14, 'UNAVILABLE'],
    [15, 'DATA_LOSS'],
    [16, 'UNAUTHENTICATED'],
  ])('converts %i to %s', (code, name) => {
    expect(rpc.codeName(code)).toEqual(name)
  })
})

describe('codeToHttpStatus()', () => {
  test.each([
    ['OK', rpc.Code.OK, 200],
    ['CANCELLED', rpc.Code.CANCELLED, 499],
    ['UNKNOWN', rpc.Code.UNKNOWN, 500],
    ['INVALID_ARGUMENT', rpc.Code.INVALID_ARGUMENT, 400],
    ['DEADLINE_EXCEEDED', rpc.Code.DEADLINE_EXCEEDED, 504],
    ['NOT_FOUND', rpc.Code.NOT_FOUND, 404],
    ['ALREADY_EXISTS', rpc.Code.ALREADY_EXISTS, 409],
    ['PERMISSION_DENIED', rpc.Code.PERMISSION_DENIED, 403],
    ['RESOURCE_EXHAUSTED', rpc.Code.RESOURCE_EXHAUSTED, 429],
    ['FAILED_PRECONDITION', rpc.Code.FAILED_PRECONDITION, 400],
    ['ABORTED', rpc.Code.ABORTED, 409],
    ['OUT_OF_RANGE', rpc.Code.OUT_OF_RANGE, 400],
    ['UNIMPLEMENTED', rpc.Code.UNIMPLEMENTED, 501],
    ['INTERNAL', rpc.Code.INTERNAL, 500],
    ['UNAVILABLE', rpc.Code.UNAVILABLE, 503],
    ['DATA_LOSS', rpc.Code.DATA_LOSS, 500],
    ['UNAUTHENTICATED', rpc.Code.UNAUTHENTICATED, 401],
  ])(`convert valid code '%s' (%d) to HttpStatus code (%d)`, (_name, code, http) => {
    expect(rpc.codeToHttpStatus(code as number)).toEqual(http)
  })
  test('unknown code returns 500', () => {
    expect(rpc.codeToHttpStatus(123)).toBe(500)
  })
})
