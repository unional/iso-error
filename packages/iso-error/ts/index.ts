/* eslint-disable @typescript-eslint/unbound-method */

//#region captureStackTrace polyfill
// istanbul ignore next
if (!Error.captureStackTrace) {
  Error.captureStackTrace = function (error) {
    const container = new Error()

    Object.defineProperty(error, 'stack', {
      configurable: true,
      get: function (this: Error) {
        // Replace property with value for faster future accesses.
        defineStack(this, container.stack)
        return container.stack
      },
      set: function (stack: string | undefined) { defineStack(error, stack) },
    })
  }
}

// istanbul ignore next
function defineStack(target: Record<string, any>, value: string | undefined) {
  Object.defineProperty(target, 'stack', {
    configurable: true,
    value,
    writable: true,
  })
}
//#endregion

export type IsoErrorPlugin = {
  toSerializable(err: Error): Record<string | number, any> | undefined,
  fromSerializable(jsonObj: Record<string | number, any>): Error | undefined,
}

const serializers: IsoErrorPlugin['toSerializable'][] = []
const deserializers: IsoErrorPlugin['fromSerializable'][] = []

/**
 * Isomorphic Error that works across physical boundary.
 */
export class IsoError extends Error {
  /**
   * Create an IsoError with additional properties without the need to create a new class.
   * @param props properties of the IsoError
   */
  static create<P extends { message: string, cause?: Error }>(props: P): IsoError & Pick<P, Exclude<keyof P, 'cause' | 'message'>> {
    const { message, cause, ...rest } = props
    const err = new IsoError(message, { cause, ssf: IsoError.create })
    return Object.assign(err, rest)
  }

  static stringify(err: Error) {
    return this.serialize(err)
  }

  static serialize(err: Error) {
    return JSON.stringify(this.toSerializable(err))
  }

  /**
   * @type P Additional properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static parse<E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause>(text: string): E {
    return deserialize<E>(IsoError.parse, text)
  }

  /**
   * @type P Additional properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static deserialize<
    E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause
  >(text: string): E {
    return deserialize<E>(IsoError.deserialize, text)
  }

  static toSerializable(err: Error) {
    return serializers.reduce<Record<string, any> | undefined>((p, s) => p || s(err), undefined)
      || toSerializableError(err)
  }

  static fromSerializable<
    E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause
  >(json: IsoError.Serializable): E {
    const err = deserializeError<E>(json)

    Error.captureStackTrace(err, IsoError.fromSerializable)
    return err
  }
  /**
   * returns the error message including the error causes.
   */
  static trace(err: Error) {
    return trace(err)
  }

  static addPlugin({ toSerializable, fromSerializable }: IsoErrorPlugin) {
    serializers.unshift(toSerializable)
    deserializers.unshift(fromSerializable)
  }

  /**
   * Name of the error
   */
  name: string

  /**
   * Error cause
   */
  cause?: IsoError.ErrorWithCause

  constructor(message?: string, options?: IsoError.Options) {
    super(message)

    //restore prototype chain
    const actualProto = new.target.prototype

    this.name = actualProto.constructor.name

    // istanbul ignore next
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else (this as any).__proto__ = actualProto

    if (options?.cause) this.cause = toIsoError(options.cause)
    if (options?.ssf) Error.captureStackTrace(this, options.ssf)
  }

  toString() { return IsoError.serialize(this) }

  trace() { return IsoError.trace(this) }
}

export namespace IsoError {
  export type Options = {
    cause?: Error,
    /**
     * stack start function
     */
    ssf?: (...args: any) => any
  }

  export type ErrorWithCause = Error & Options

  export type Serializable = {
    name: string,
    message?: string,
    cause?: Serializable
  } & Record<string | number, any>

}

function deserialize<
  E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause
>(fn: (text: string) => E, text: string) {
  const json = JSON.parse(text) as Record<string, any>
  const err = deserializeError<E>(json)

  Error.captureStackTrace(err, fn)
  return err
}

function deserializeError<
  E extends IsoError.ErrorWithCause
>(json: Record<string, any>): E {
  let err: E | undefined = undefined
  for (const d of deserializers) {
    err = d(json) as E | undefined
    if (err) break
  }

  return err || defaultDeserializeError<E>(json)
}


function defaultDeserializeError<
  E extends IsoError.ErrorWithCause
>(json: Record<string | number, any>): E {
  if (json.name === 'AggregateError') {
    const { message, errors, ...rest } = json as { message: string, errors: any[] }
    // @ts-ignore
    if (global.AggregateError) {
      return Object.assign(new AggregateError(errors as unknown as any, message), rest) as unknown as E
    }
    else {
      return Object.assign(new Error(message), {
        ...rest,
        errors
      }) as unknown as E
    }
  }

  const { message, cause, ...rest } = json as { message?: string, cause?: unknown } & Record<string | number, any>
  const causeError = cause ? deserializeError(cause as Error) : undefined

  if (json.name === 'Error') {
    return Object.assign(new Error(message), causeError ? { ...rest, cause: causeError } : rest) as E
  }

  // @ts-ignore
  return Object.assign(new IsoError(message, causeError ? { cause: causeError } : undefined), rest)
}

function toSerializableError(err: Error & { cause?: Error }): IsoError.Serializable {
  if (isAggregateError(err)) {
    return {
      ...err, name: err.constructor.name, message: err.message,
      errors: err.errors.map(toSerializableError)
    }
  }
  if (err instanceof Error) {
    const { message, cause } = err
    return cause
      ? { ...err, name: err.constructor.name, message, cause: toSerializableError(cause) }
      : { ...err, name: err.constructor.name, message }
  }
  return err
}

// NOTE: In this function I have to to Object.assign to keep the err instance and its stack trace.
function toIsoError(err: Error) {
  if (err instanceof IsoError) return err

  // When the error is an internal error from deserialzation,
  // the err.constructor.name is object
  return Object.assign(err, { name: err.constructor.name !== 'Object' ? err.constructor.name : err.name })
}

function trace(err: unknown) {
  const messages: string[] = []
  if (err instanceof ModuleError) {
    messages.push(`${err.name}(${err.module}): ${err.message}`)
  }
  else if (err instanceof Error) {
    messages.push(`${err.name}: ${err.message}`)
  }

  if (isAggregateError(err)) {
    err.errors.forEach(e => messages.push(...trace(e).split('\n').map(s => '  ' + s)))
  }
  if (err instanceof Error) {
    if (hasCause(err)) messages.push(...trace(err.cause).split('\n').map(s => '  ' + s))
  }
  else {
    messages.push(typeof err === 'string' ? err : JSON.stringify(err))
  }

  return messages.join('\n')
}

function hasCause(x: any): x is { cause: Error } {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!x.cause
}

/**
 * An IsoError with a module property.
 */
export class ModuleError extends IsoError {
  /**
   * @param module The module that defines this error.
   */
  constructor(public module: string, message?: string, options?: IsoError.Options) {
    super(message, options)
  }
}

export function isAggregateError(error: Error | unknown): error is AggregateError {
  return error instanceof Error && Array.isArray((error as any).errors)
}
