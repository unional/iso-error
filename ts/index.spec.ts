import a from 'assertron'
import { omit } from 'type-plus'
import { IsoError, ModuleError } from '.'

describe('IsoError', () => {
  test('message is optional', () => {
    const error = new IsoError()
    expect(error).toBeInstanceOf(IsoError)
  })

  test('is instanceof Error', () => {
    const e = new IsoError('instance of')

    expect(e instanceof Error).toBeTruthy()
  })

  test('is instanceof IsoError', () => {
    expect((new IsoError('is iso')) instanceof IsoError).toBeTruthy()
  })

  // This does not work
  test.skip('deserialize passes instanceof if target class is defined', () => {
    class DefinedError extends IsoError {
      constructor() {
        super('defined')
      }
    }

    const actual = IsoError.deserialize(JSON.stringify({ name: 'DefinedError' }))
    expect(actual).toBeInstanceOf(DefinedError)
  })

  test('deserialize not defined error gets IsoError', () => {
    const actual = IsoError.deserialize(JSON.stringify({ name: 'NotDefinedError' }))
    expect(actual).toBeInstanceOf(IsoError)
  })

  test('can cause by multiple errors', () => {
    class CustomError extends Error { }

    const e = new IsoError('multi-errors', new Error('abc'), new IsoError('iso', new CustomError('cust')))

    a.satisfies(e, {
      errors: [{
        name: 'Error',
        message: 'abc',
      }, {
        name: 'IsoError',
        message: 'iso',
        errors: [{
          name: 'CustomError',
          message: 'cust',
        }],
      }],
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

  test('toString() is the same as IsoError.serialize()', () => {
    const err = IsoError.create({ message: 'some error' })
    expect(err.toString()).toEqual(IsoError.serialize(err))
  })

  describe('IsoError.stringify()', () => {
    test('contains message', () => {
      const e = new IsoError('with message')

      a.satisfies(JSON.parse(IsoError.stringify(e)), {
        name: 'IsoError',
        message: 'with message',
      })
    })
    test('can stringify simple error', () => {
      const err = new Error('simple error')

      a.satisfies(JSON.parse(IsoError.stringify(err)), {
        name: 'Error',
        message: 'simple error',
      })
    })
    test('custom error', () => {
      class Custom extends IsoError { }
      const err = new Custom('custom')
      const actual: unknown = JSON.parse(IsoError.stringify(err))

      a.satisfies(actual, {
        name: 'Custom',
        message: 'custom',
      })
    })
    test('with sub errors', () => {
      const err = new IsoError('with sub', new Error('sub 1'), new IsoError('sub 2'))
      const actual: unknown = JSON.parse(IsoError.stringify(err))

      a.satisfies(actual, {
        errors: [{
          message: 'sub 1',
        }, {
          message: 'sub 2',
        }],
      })
    })
  })

  describe('IsoError.deserialize()', () => {
    test('stack trace starts at call site', () => {
      const actual = IsoError.deserialize('{}')
      expect(actual.stack).toMatch(/IsoError:.*\n.*index.spec.ts/)
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
      expect(actual.stack).toMatch(/IsoError:.*\n.*index.spec.ts/)
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
          message: 'sub',
        }, {
          name: 'IsoError',
          message: 'sub2',
        }],
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
      expect(actual.stack).toMatch(/IsoError:.*\n.*index.spec.ts/)
    })

    test('create with sub-errors', () => {
      const actual = IsoError.create({ message: 'sub', errors: [new Error('sub 1'), new IsoError('sub 2')] })

      a.satisfies(actual, {
        errors: [{
          message: 'sub 1',
        }, {
          message: 'sub 2',
        }],
      })
    })
  })

  describe('IsoError.toSerializable()', () => {
    test('convert error to a serializable json object', () => {
      const e = new IsoError('some message')
      const actual = IsoError.toSerializable(e)
      expect(actual).toEqual({ name: 'IsoError', message: 'some message', errors: [] })
    })
  })

  describe('IsoError.fromSerializable()', () => {
    test('convert serializable json object back to an error', () => {
      const actual = IsoError.fromSerializable({ name: 'IsoError', message: 'some message', errors: [] })

      expect(actual).toBeInstanceOf(IsoError)
      expect(actual.message).toEqual('some message')
    })
  })
})

describe('ModuleError', () => {
  test('with module', () => {
    const e = new ModuleError('iso-error', 'mod')

    a.satisfies(e, { module: 'iso-error' })
  })

  test('is instanceof IsoError', () => {
    expect((new ModuleError('m', 'is iso')) instanceof IsoError).toBeTruthy()
  })

  test('is instanceof ModuleError', () => {
    expect((new ModuleError('m', 'is iso')) instanceof ModuleError).toBeTruthy()
  })

  test('instanceof for extended custom error works', () => {
    class CustomError extends ModuleError {
      constructor() {
        super('cust', 'blah')
      }
    }
    expect((new CustomError()) instanceof CustomError).toBeTruthy()
  })

  test('toString() is the same as IsoError.serialize()', () => {
    const err = new ModuleError('module-x', 'some error')
    expect(err.toString()).toEqual(IsoError.serialize(err))
  })
})

describe('IsoError.addPlugin()', () => {
  test('fall back to default if plugin does not support the specified error', () => {
    IsoError.addPlugin({
      toSerializable() {
        return undefined
      },
      fromSerializable() {
        return undefined
      },
    })

    const msg = IsoError.serialize(IsoError.create({ message: 'dummy' }))
    const actual = IsoError.deserialize(msg)

    a.satisfies(actual, { message: 'dummy' })
  })
  test('use plugin to serialize and deserialize', () => {
    class WithSecret extends IsoError {
      secret = 'secret msg'
    }

    IsoError.addPlugin({
      toSerializable(err) {
        if (err.name === 'WithSecret') {
          return omit(err as Record<string, any>, 'secret')
        }
      },
      fromSerializable(obj) {
        if (obj.name === 'WithSecret') {
          return new WithSecret('no secret')
        }
      },
    })

    const json = IsoError.serialize(new WithSecret('has secret'))

    expect(json).not.toMatch(/secret msg/)

    const actual = IsoError.deserialize(json)

    expect(actual.message).toBe('no secret')
  })
})

test('pass instanceof before serialize', () => {
  class BaseError extends ModuleError {
    constructor(message: string, ...errors: Error[]) {
      super('custom', message, ...errors)
    }
  }
  class RealError extends BaseError {
    constructor(message: string, ...errors: Error[]) {
      super(message, ...errors)
    }
  }

  expect(new RealError('some error')).toBeInstanceOf(RealError)
})
