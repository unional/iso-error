import a from 'assertron';
import { IsoError, ModuleError } from '.';

describe('IsoError', () => {
  test('is instanceof Error', () => {
    const e = new IsoError('instance of')

    expect(e instanceof Error).toBeTruthy();
  })

  test('can cause by multiple errors', () => {
    class CustomError extends Error { }

    const e = new IsoError('multi-errors', new Error('abc'), new IsoError('iso', new CustomError('cust')))

    a.satisfies(e, {
      errors: [{
        name: 'Error',
        message: 'abc'
      }, {
        name: 'IsoError',
        message: 'iso',
        errors: [{
          name: 'CustomError',
          message: 'cust'
        }]
      }
      ]
    })
  })

  test('trace() includes error causes', () => {
    class CustomError extends Error { }

    const e = new IsoError('multi-errors',
      new Error('abc'),
      new IsoError('iso',
        new CustomError('cust'),
        new IsoError('iso2')))

    expect(IsoError.trace(e)).toEqual(`IsoError: multi-errors
  Error: abc
  IsoError: iso
    CustomError: cust
    IsoError: iso2`)
  })

  test('trace includes module information', () => {
    const err = new IsoError('base', new ModuleError('module-x', 'some error'))
    expect(IsoError.trace(err)).toEqual(`IsoError: base
  ModuleError(module-x): some error`)
  })

  test('trace works on normal error', () => {
    const err = new Error('something is wrong')

    expect(IsoError.trace(err)).toEqual(`Error: something is wrong`)
  })

  describe('IsoError.stringify()', () => {
    test('contains message', () => {
      const e = new IsoError('with message')

      a.satisfies(JSON.parse(IsoError.stringify(e)), {
        name: 'IsoError',
        message: 'with message'
      })
    })
    test('can stringify simple error', () => {
      const err = new Error('simple error')

      a.satisfies(JSON.parse(IsoError.stringify(err)), {
        name: 'Error',
        message: 'simple error'
      })
    })
    test('custom error', () => {
      class Custom extends IsoError { }
      const err = new Custom('custom')
      const actual = JSON.parse(IsoError.stringify(err))

      a.satisfies(actual, {
        name: 'Custom',
        message: 'custom'
      })
    })
    test('with sub errors', () => {
      const err = new IsoError('with sub', new Error('sub 1'), new IsoError('sub 2'))
      const actual = JSON.parse(IsoError.stringify(err))

      a.satisfies(actual, {
        errors: [{
          message: 'sub 1'
        }, {
          message: 'sub 2'
        }]
      })
    })
  })

  describe('IsoError.deserialize()', () => {
    test('stack trace starts at call site', () => {
      const actual = IsoError.deserialize('{}')
      expect(actual.stack).toMatch(/Error:\s*at Object.test/)
    })
  })

  describe('IsoError.parse()', () => {
    test('result is an instance of IsoError', () => {
      const actual = IsoError.parse('{"name":"IsoError"}')

      expect(actual instanceof IsoError).toBeTruthy()
    })

    test('default fields are filled in', () => {
      const actual = IsoError.parse('{}')
      expect(actual.name).toBe('IsoError')
      expect(actual.message).toBe('')
    })

    test('can still parse even if the error type does not exist', () => {
      const actual = IsoError.parse('{"name":"SomeSubError"}')
      expect(actual instanceof IsoError).toBeTruthy()
    })

    test('stack trace starts at call site', () => {
      const actual = IsoError.parse('{}')
      expect(actual.stack).toMatch(/Error:\s*at Object.test/)
    })

    test('extra fields are parsed', () => {
      const actual = IsoError.parse('{"other":"abc"}')
      expect(actual.other).toBe('abc')
    })

    test('can specify return type', () => {
      const actual = IsoError.parse<{ other: number }>('{"other":1}')
      expect(actual.other).toBe(1)
    })

    test('custom error', () => {
      class Custom extends IsoError { }
      const err = new Custom('custom')
      const actual = IsoError.parse(IsoError.stringify(err))
      expect(actual.name).toBe('Custom')
    })

    test('with sub-error', () => {
      const actual = IsoError.parse('{"name":"IsoError","message":"with sub","errors":[{"name":"Error","message":"sub"},{"name":"IsoError","message":"sub2"}]}')

      a.satisfies(actual, {
        name: 'IsoError',
        message: 'with sub',
        errors: [{
          name: 'Error',
          message: 'sub'
        }, {
          name: 'IsoError',
          message: 'sub2'
        }]
      })
    })
  })

  describe('IsoError.create()', () => {
    test('can create basic IsoError', () => {
      const actual = IsoError.create({ message: 'a' })
      expect(actual.message).toBe('a')
    })

    test('create IsoError with additional properties', () => {
      const actual = IsoError.create({ message: 'a', code: 'e_iso-error_0001' })
      expect(actual.code).toBe('e_iso-error_0001')
    })

    test('create without errors will have errors property as undefined', () => {
      const actual = IsoError.create({ message: 'a' })
      expect(actual.errors).toBeUndefined()
    })

    test('stack trace starts at call site', () => {
      const actual = IsoError.create({ message: '' })
      expect(actual.stack).toMatch(/Error:\s*at Object.test/)
    })

    test('create with sub-errors', () => {
      const actual = IsoError.create({ message: 'sub', errors: [new Error('sub 1'), new IsoError('sub 2')] })

      a.satisfies(actual, {
        errors: [{
          message: 'sub 1'
        }, {
          message: 'sub 2'
        }]
      })
    })
  })
})

describe('ModuleError', () => {

  test('with module', () => {
    const e = new ModuleError('iso-error', 'mod')

    a.satisfies(e, { module: 'iso-error' })
  })
})
