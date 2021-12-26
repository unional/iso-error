import a from 'assertron'
import { omit } from 'type-plus'
import { IsoError, ModuleError } from '.'

class SubError extends IsoError { }

describe('IsoError', () => {
  test('message is optional', () => {
    const e = new IsoError()
    expect(e.message).toBe('')
  })

  test('is instanceof Error', () => {
    expect(new IsoError()).toBeInstanceOf(Error);
  })

  test('restored prototype chain so that IsoError is instanceof IsoError', () => {
    // the problem only occurs when TypeScript transpile to ES5
    expect(new IsoError()).toBeInstanceOf(IsoError)
  })

  test('e.name is the name of the Error', () => {
    const e = new IsoError()
    expect(e.name).toBe('IsoError')

    const s = new SubError()
    expect(s.name).toBe('SubError')
  })

  // This does not work
  test.skip('deserialize passes instanceof if target class is defined', () => {
    const actual = IsoError.deserialize(JSON.stringify({ name: 'SubError' }))
    expect(actual).toBeInstanceOf(SubError)
  })

  test('with cause', () => {
    const e = new IsoError('with cause', { cause: new Error('abc') })

    a.satisfies(e, {
      cause: {
        name: 'Error',
        message: 'abc'
      }
    })
  })

  test('with nested cause', () => {
    const e = new IsoError('nested', {
      cause: new IsoError('with cause', { cause: new Error('abc') })
    })
    a.satisfies(e, {
      name: 'IsoError',
      message: 'nested',
      cause: {
        name: 'IsoError',
        message: 'with cause',
        cause: {
          name: 'Error',
          message: 'abc'
        }
      }
    })
  })
})

describe('ModuleError', () => {
  test('module param is required and available as the `module` property', () => {
    const e = new ModuleError('iso-error')

    a.satisfies(e, { module: 'iso-error' })
  })

  test('is instanceof IsoError', () => {
    expect(new ModuleError('m')).toBeInstanceOf(IsoError)
  })

  test('is instanceof ModuleError', () => {
    expect(new ModuleError('m')).toBeInstanceOf(ModuleError)
  })

  test('instanceof for extended custom error works', () => {
    class CustomError extends ModuleError {
      constructor() {
        super('cust', 'blah')
      }
    }
    expect(new CustomError()).toBeInstanceOf(CustomError)
  })

  test('toString() is the same as IsoError.serialize()', () => {
    const err = new ModuleError('module-x', 'some error')
    expect(err.toString()).toEqual(IsoError.serialize(err))
  })

  test('pass instanceof before serialize', () => {
    class BaseError extends ModuleError {
      constructor(message: string, options?: IsoError.Options) {
        super('custom', message, options)
      }
    }
    class RealError extends BaseError {
      constructor(message: string, options?: IsoError.Options) {
        super(message, options)
      }
    }

    expect(new RealError('some error')).toBeInstanceOf(RealError)
  })
  test('with cause', () => {
    const e = new ModuleError('m', 'with cause', { cause: new Error('abc') })

    a.satisfies(e, {
      name: 'ModuleError',
      cause: {
        name: 'Error',
        message: 'abc'
      }
    })
  })
})

describe('IsoError.trace()', () => {
  test('with cause', () => {
    const e = new IsoError('with cause', { cause: new Error('abc') })
    expect(IsoError.trace(e)).toEqual(`IsoError: with cause
  Error: abc`)
  })
  test('with custom error cause', () => {
    class CustomError extends IsoError { }

    const e = new IsoError('with cause', { cause: new CustomError('abc') })

    expect(IsoError.trace(e)).toEqual(`IsoError: with cause
  CustomError: abc`)
  })
  test('with nested error cause', () => {
    class CustomError extends IsoError { }

    const e = new IsoError('nested',
      { cause: new IsoError('with cause', { cause: new CustomError('custom') }) }
    )

    expect(IsoError.trace(e)).toEqual(`IsoError: nested
  IsoError: with cause
    CustomError: custom`)
  })

  test('trace includes module information', () => {
    const err = new IsoError('base', { cause: new ModuleError('module-x', 'some error') })
    expect(IsoError.trace(err)).toEqual(`IsoError: base
  ModuleError(module-x): some error`)
  })

  test('trace works on normal error', () => {
    const err = new Error('something is wrong')

    expect(IsoError.trace(err)).toEqual(`Error: something is wrong`)
  })
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
  test('with cause', () => {
    const err = new IsoError('with sub', { cause: new Error('sub error') })
    const actual: unknown = JSON.parse(IsoError.stringify(err))

    a.satisfies(actual, {
      cause: {
        message: 'sub error',
      },
    })
  })

  test('toString() is the same as IsoError.serialize()', () => {
    const err = IsoError.create({ message: 'some error' })
    expect(err.toString()).toEqual(IsoError.serialize(err))
  })
})

describe('IsoError.deserialize()', () => {
  test('deserializing an defined error gets IsoError', () => {
    const actual = IsoError.deserialize(JSON.stringify({ name: 'SubError' }))
    expect(actual).toBeInstanceOf(IsoError)
  })

  test('deserializing an not defined error gets IsoError', () => {
    const actual = IsoError.deserialize(JSON.stringify({ name: 'NotDefinedError' }))
    expect(actual).toBeInstanceOf(IsoError)
  })

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

  test('with cause', () => {
    const actual = IsoError.parse('{"name":"IsoError","message":"with sub","cause":{"name":"Error","message":"sub"}}')

    a.satisfies(actual, {
      name: 'IsoError',
      message: 'with sub',
      cause: {
        name: 'Error',
        message: 'sub',
      },
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

  test('create without cause will have cause property as undefined', () => {
    const actual = IsoError.create({ message: 'a' })
    expect(actual.cause).toBeUndefined()
  })

  test('stack trace starts at call site', () => {
    const actual = IsoError.create({ message: '' })
    expect(actual.stack).toMatch(/IsoError:.*\n.*index.spec.ts/)
  })

  test('create with cause', () => {
    const actual = IsoError.create({ message: 'sub', cause: new Error('sub error') })

    a.satisfies(actual, {
      cause: {
        message: 'sub error',
      },
    })
  })
})

describe('IsoError.toSerializable()', () => {
  test('convert error to a serializable json object', () => {
    const e = new IsoError('some message')
    const actual = IsoError.toSerializable(e)
    expect(actual).toEqual({ name: 'IsoError', message: 'some message' })
  })
})

describe('IsoError.fromSerializable()', () => {
  test('convert serializable json object back to an error', () => {
    const actual = IsoError.fromSerializable({ name: 'IsoError', message: 'some message', errors: [] })

    expect(actual).toBeInstanceOf(IsoError)
    expect(actual.message).toEqual('some message')
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
