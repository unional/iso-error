import { IsoError } from '.';
import a from 'assertron'

test('input code can be number, convert to string', () => {
  const err = new IsoError(123, 'number')

  expect(err.code).toBe('123')
})

test('code can be string', () => {
  expect(new IsoError('123', 'string')).toBeDefined()
})

test('is instanceof Error', () => {
  const e = new IsoError(111, 'instance of')

  expect(e instanceof Error).toBeTruthy();
})

test('can be stringified', () => {
  const e = new IsoError(123, 'to string')

  a.satisfies(JSON.parse(JSON.stringify(e)), {
    code: '123',
    description: 'to string',
    type: 'IsoError'
  })
})

test('can cause by multiple errors', () => {
  class CustomError extends Error {}

  const e = new IsoError(111, 'multi-errors', new Error('abc'), new CustomError('cust'))

  a.satisfies(e, {
    errors: [{
      type: 'Error',
      code: '',
      description: 'abc'
    }, {
      type: 'CustomError',
      code: '',
      description: 'cust'
    }]
  })
})

test('IsoError.stringify is the same as JSON.stringify', () => {
  const e = new IsoError(1, 'stringify')
  const j = IsoError.stringify(e)

  expect(JSON.stringify(e)).toBe(j)
})

describe('IsoError.parse()', () => {
  test('instance of IsoError and Error', () => {
    const actual = IsoError.parse('{"type":"IsoError"}')

    expect(actual instanceof Error).toBeTruthy()
    expect(actual instanceof IsoError).toBeTruthy()
  })

  test('can still parse even if the error type does not exist', () => {
    const actual = IsoError.parse('{"type":"SomeSubError"}')

    expect(actual instanceof IsoError).toBeTruthy()
  })

  test('default fields are filled in', () => {
    const actual = IsoError.parse('{}')
    expect(actual.code).toBe('')
    expect(actual.type).toBe('IsoError')
    expect(actual.description).toBe('')
  })

  test('stack trace starts at call site', () => {
    const actual = IsoError.parse('{}')
    expect(actual.stack).toMatch(/Error:\s*at Object.test/)
  })

  test('extra fields are parsed', () => {
    const actual = IsoError.parse('{"other":"abc"}')
    expect(actual.other).toBe('abc')
  })
})
