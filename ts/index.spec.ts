
import a from 'assertron'
import { omit } from 'type-plus'
import { IsoError, ModuleError } from '.'
import { createError, MikuSickError, MyModuleError, SubError } from './testErrors'

describe('IsoError', () => {
  test('IsoError extends Error', () => {
    expect(new IsoError()).toBeInstanceOf(Error)
  })
  test('instanceof is working with restored prototype chain when transpiled to ES5', () => {
    // `jest` is using `ts-jest` with `tsconfig.json` which transpile to ES5
    expect(new IsoError()).toBeInstanceOf(IsoError)
  })
  test('e.name is the name of the Error', () => {
    expect(new IsoError().name).toBe('IsoError')
    expect(new SubError().name).toBe('SubError')
  })
  test('message is optional, just like Error', () => {
    const e = new IsoError()
    expect(e.message).toBe('')
  })
  test('support cause, must be Error', () => {
    const cause = new Error()
    const e = new IsoError('with cause', { cause })
    expect(e.cause).toBe(cause)
  })
  test('cause can be nested', () => {
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
  describe('isoError.trace()', () => {
    test('produces a readable digest of the error', () => {
      const e = new IsoError('some message')
      const actual = e.trace()
      expect(actual).toEqual('IsoError: some message')
    })
    test('includes cause with indentation', () => {
      const e = new IsoError('with cause', { cause: new Error('abc') })
      expect(IsoError.trace(e)).toEqual(`IsoError: with cause
  Error: abc`)
    })
    // @ts-ignore
    if (global.AggregateError) {
      test('includes errors in AggregateError with indentation', () => {
        const e = new IsoError('top', {
          cause: new AggregateError([
            new Error('a'),
            new IsoError('b', {
              cause: new Error('c')
            })
          ], 'agg')
        })
        const actual = e.trace()
        expect(actual).toEqual(`IsoError: top
  AggregateError: agg
    Error: a
    IsoError: b
      Error: c`)
      })
    }
  })
  test('e.toString() produces json', () => {
    const e = new IsoError('iso', { cause: new Error('sub') })
    const actual = e.toString()
    expect(JSON.parse(actual)).toEqual({
      name: 'IsoError',
      message: 'iso',
      cause: {
        name: 'Error',
        message: 'sub'
      }
    })
  })
  test('e.toString() is the same as IsoError.serialize(e)', () => {
    const e = new IsoError('iso', { cause: new Error('sub') })
    expect(e.toString()).toEqual(IsoError.serialize(e))
  })
})

describe('ModuleError', () => {
  test('module param is required and available as the `module` property', () => {
    a.satisfies(new ModuleError('iso-error'), { module: 'iso-error' })
  })
  test('is instanceof IsoError', () => {
    expect(new ModuleError('m')).toBeInstanceOf(IsoError)
  })
  test('is instanceof ModuleError', () => {
    expect(new ModuleError('m')).toBeInstanceOf(ModuleError)
  })
  test('sub class of ModuleError works with instanceof check', () => {
    expect(new MyModuleError()).toBeInstanceOf(MyModuleError)
    expect(new MikuSickError()).toBeInstanceOf(MikuSickError)
  })
  test('trace() includes module information', () => {
    const e = new ModuleError('module-x', 'some error')
    expect(IsoError.trace(e)).toEqual(`ModuleError(module-x): some error`)
  })
  test('toString() includes module info', () => {
    const e = new ModuleError('module-x', 'some error')
    expect(JSON.parse(e.toString())).toEqual({
      name: 'ModuleError',
      module: 'module-x',
      message: 'some error'
    })
  })
})

describe('IsoError.trace() produces a readable digest of the error', () => {
  test('also work with normal error', () => {
    const err = new Error('something is wrong')
    expect(IsoError.trace(err)).toEqual(`Error: something is wrong`)
  })
  test('with cause', () => {
    const e = new IsoError('with cause', { cause: new Error('abc') })
    expect(IsoError.trace(e)).toEqual(`IsoError: with cause
  Error: abc`)
  })
  test('with custom error cause', () => {
    const e = new IsoError('with cause', { cause: new SubError('abc') })

    expect(IsoError.trace(e)).toEqual(`IsoError: with cause
  SubError: abc`)
  })
  test('with nested error cause', () => {
    const e = new IsoError(
      'nested',
      {
        cause: new IsoError(
          'with cause',
          { cause: new SubError('custom') })
      }
    )

    expect(IsoError.trace(e)).toEqual(`IsoError: nested
  IsoError: with cause
    SubError: custom`)
  })
  test('includes module information with ModuleError', () => {
    const err = new IsoError('base', { cause: new ModuleError('module-x', 'some error') })
    expect(IsoError.trace(err)).toEqual(`IsoError: base
  ModuleError(module-x): some error`)
  })
  // @ts-ignore
  if (global.AggregateError) {
    test('AggregateError non Error in the `errors` field', () => {
      const e = new AggregateError([
        'wrong', 'even worse', 1, true, ['a'], { b: 1 }
      ], 'agg')
      expect(IsoError.trace(e)).toEqual(`AggregateError: agg
  wrong
  even worse
  1
  true
  ["a"]
  {"b":1}`)
    })
  }
})

describe('IsoError.serialize()', () => {
  test('work with Error', () => {
    const e = new Error('some error')
    const actual = IsoError.serialize(e)

    expect(JSON.parse(actual)).toEqual({
      name: 'Error',
      message: 'some error'
    })
  })
  test('Error with cause', () => {
    const e = new Error('with cause');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (e as any).cause = new Error('sub error')

    const actual = IsoError.serialize(e)

    expect(JSON.parse(actual)).toEqual({
      name: 'Error',
      message: 'with cause',
      cause: {
        name: 'Error',
        message: 'sub error'
      }
    })
  })
  // @ts-ignore
  if (global.AggregateError) {
    test('work with AggregateError', () => {
      const e = new AggregateError(
        [new Error('a'), new Error('b')], 'aggregate')
      const actual = IsoError.serialize(e)

      expect(JSON.parse(actual)).toEqual({
        name: 'AggregateError',
        message: 'aggregate',
        errors: [{
          name: 'Error',
          message: 'a'
        }, {
          name: 'Error',
          message: 'b'
        }]
      })
    })
  }
  test('work with IsoError', () => {
    const e = new IsoError('iso')
    const actual = IsoError.serialize(e)

    expect(JSON.parse(actual)).toEqual({
      name: 'IsoError',
      message: 'iso'
    })
  })
  test('IsoError with cause', () => {
    const e = new IsoError('iso', { cause: new IsoError('sub') })
    const actual = IsoError.serialize(e)

    expect(JSON.parse(actual)).toEqual({
      name: 'IsoError',
      message: 'iso',
      cause: {
        name: 'IsoError',
        message: 'sub'
      }
    })
  })
  test('other properties in sub class are serialized', () => {
    // so it is important to not include sensitive information in error properties.
    // or add a plugin to filter out those properties during serialization
    class WithProp extends IsoError {
      other = 'abc'
    }
    const e = new WithProp('with prop')
    const actual = IsoError.serialize(e)

    expect(JSON.parse(actual)).toEqual({
      name: 'WithProp',
      message: 'with prop',
      other: 'abc'
    })
  })
})

describe('IsoError.deserialize()', () => {
  test('cannot restore to the same class', () => {
    const e = new SubError()
    const actual = IsoError.deserialize(IsoError.serialize(e))
    expect(actual).not.toBeInstanceOf(SubError)
    expect(actual).toBeInstanceOf(IsoError)
    expect(actual).toBeInstanceOf(Error)
  })
  test('result is instance of IsoError', () => {
    const e = new IsoError()
    const actual = IsoError.deserialize(IsoError.serialize(e))
    expect(actual).toBeInstanceOf(IsoError)
    expect(actual).toBeInstanceOf(Error)
  })
  test('work with Error', () => {
    const e = new Error()
    const actual = IsoError.deserialize(IsoError.serialize(e))
    expect(actual).not.toBeInstanceOf(IsoError)
    expect(actual).toBeInstanceOf(Error)
  })
  test('restore cause', () => {
    const e = new IsoError('iso', { cause: new Error('a') })
    const actual = IsoError.deserialize(IsoError.serialize(e))
    expect(actual.cause).toBeInstanceOf(Error)
    expect(actual.cause?.message).toBe('a')
  })
  test('stack trace starts at call site', () => {
    const actual = IsoError.deserialize(IsoError.serialize(createError()))
    expect(actual.stack).toMatch(/Error:.*\n.*index.spec.ts/)
  })
})

describe('serialization', () => {
  test('result is an instance of IsoError', () => {
    const e = new IsoError('roundtrip')

    const actual = IsoError.parse(IsoError.stringify(e))

    expect(actual).toBeInstanceOf(IsoError)
    expect(actual.name).toBe('IsoError')
    expect(actual.message).toBe('roundtrip')
  })

  test('work with custom error, but only pass instanceof IsoError', () => {
    const e = new SubError('sub')
    const actual = IsoError.parse(IsoError.stringify(e))
    expect(actual).toBeInstanceOf(IsoError)
    expect(actual.name).toBe('SubError')
    expect(actual.message).toBe('sub')
  })

  test('stack trace starts at call site', () => {
    const e = new IsoError('trace')
    const actual = IsoError.parse(IsoError.stringify(e))
    expect(actual.stack).toMatch(/IsoError:.*\n.*index.spec.ts/)
  })

  test('extra fields are parsed', () => {
    const actual: Record<any, any> = IsoError.parse('{"other":"abc"}')
    expect(actual.other).toBe('abc')
  })

  test('can define return type', () => {
    const actual = IsoError.parse<Error & { other: number }>('{"other":1}')
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

  // @ts-ignore
  if (global.AggregateError) {
    test('retains instance of through serialization', () => {
      const e = new AggregateError([new Error('a'), new Error('b')], 'abc')
      const actual = IsoError.deserialize(IsoError.serialize(e))

      expect(actual).toBeInstanceOf(AggregateError)
    })
  }
})

describe('IsoError.toSerializable()', () => {
  test('convert error to a serializable POJO', () => {
    const e = new IsoError('some message')
    const actual = IsoError.toSerializable(e)
    expect(actual).toEqual({ name: 'IsoError', message: 'some message' })
  })
})

describe('IsoError.fromSerializable()', () => {
  test('convert serializable json object back to an error', () => {
    const actual = IsoError.fromSerializable({ name: 'IsoError', message: 'some message' })

    expect(actual).toBeInstanceOf(IsoError)
    expect(actual.message).toEqual('some message')
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
