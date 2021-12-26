/* eslint-disable @typescript-eslint/unbound-method */

export type IsoErrorPlugin = {
  toSerializable(err: Error): IsoError.Serializable | undefined,
  fromSerializable(jsonObj: Record<string | number, any>): Error | undefined,
}

const serializers: IsoErrorPlugin['toSerializable'][] = []
const deserializers: IsoErrorPlugin['fromSerializable'][] = []

// istanbul ignore next
const captureStackTrace = Error.captureStackTrace || function (error) {
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

// istanbul ignore next
function defineStack(target: Record<string, any>, value: string | undefined) {
  Object.defineProperty(target, 'stack', {
    configurable: true,
    value,
    writable: true,
  })
}

/**
 * Isomorphic Error that works across physical boundary.
 */
export class IsoError extends Error {
  /**
   * Name of the error
   */
  name: string

  /**
   * Error cause
   */
  cause?: IsoError

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
  }

  /**
   * Create an IsoError with additional properties without the need to create a new class.
   * @param props properties of the IsoError
   */
  static create<P extends { message: string, cause?: Error }>(props: P): IsoError & Pick<P, Exclude<keyof P, 'cause' | 'message'>> {
    const { message, cause, ...rest } = props
    const err = new IsoError(message, { cause })
    captureStackTrace(err, IsoError.create)
    return Object.assign(err, rest)
  }

  static stringify(err: Error) {
    return this.serialize(err)
  }

  /**
   * @type P Additional properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static parse<P extends IsoError.Serializable = IsoError.Serializable>(text: string): IsoError & P {
    const json = JSON.parse(text) as Record<string, any>
    const err = deserializeError<P>(json)

    captureStackTrace(err, IsoError.parse)
    return err
  }

  static serialize(err: Error) {
    return JSON.stringify(this.toSerializable(err))
  }

  static toSerializable(err: Error) {
    return serializers.reduce<Record<string, any> | undefined>((p, s) => p || s(err), undefined)
      || toSerializableError(err)
  }

  /**
   * @type P Additional properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static deserialize<P extends IsoError.Serializable = IsoError.Serializable>(text: string): IsoError & P {
    const json = JSON.parse(text) as Record<string, any>
    const err = deserializeError<P>(json)

    captureStackTrace(err, IsoError.deserialize)
    return err
  }

  static fromSerializable<P extends IsoError.Serializable = IsoError.Serializable>(json: IsoError.Serializable): IsoError & P {
    const err = deserializeError<P>(json)

    captureStackTrace(err, IsoError.fromSerializable)
    return err
  }

  static addPlugin({ toSerializable, fromSerializable }: IsoErrorPlugin) {
    serializers.unshift(toSerializable)
    deserializers.unshift(fromSerializable)
  }
  /**
   * returns the error message including the error causes.
   */
  static trace = trace

  toString() { return IsoError.serialize(this) }
}

export namespace IsoError {
  export type Options = { cause?: Error }

  export type Serializable = {
    message?: string,
    cause?: Serializable
  } & Record<string | number, any>

}

function deserializeError<P extends IsoError.Serializable = IsoError.Serializable>(json: Record<string, any>): IsoError & P {
  let err: IsoError & P | undefined = undefined
  for (const d of deserializers) {
    err = d(json) as IsoError & P | undefined
    if (err) break
  }

  return err || deserializeIsoError(json)
}


function deserializeIsoError<
  P extends IsoError.Serializable = IsoError.Serializable
>({ message = '', cause, ...rest }: IsoError.Serializable): IsoError & P {
  // @ts-ignore
  return Object.assign(new IsoError(message, { cause }), rest)
}

export function toSerializableError(err: Error & { cause?: Error }): IsoError.Serializable {
  const { message, cause } = err
  return cause
    ? { ...err, name: err.constructor.name, message, cause: toSerializableError(cause) }
    : { ...err, name: err.constructor.name, message }
}

// NOTE: In this function I have to to Object.assign to keep the err instance and its stack trace.
function toIsoError(err: Error) {
  if (err instanceof IsoError) return err

  // When the error is an internal error from deserialzation,
  // the err.constructor.name is object
  return Object.assign(err, { name: err.constructor.name !== 'Object' ? err.constructor.name : err.name })
}

export type Traceable = { name: string, message: string, module?: string, cause?: Traceable }

function trace(err: Traceable) {
  const messages = [`${err.name}${err.module ? `(${err.module})` : ''}: ${err.message}`]
  if (err.cause) messages.push(...trace(err.cause).split('\n').map(s => '  ' + s))

  return messages.join('\n')
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
