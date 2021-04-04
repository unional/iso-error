/* eslint-disable @typescript-eslint/unbound-method */
export type SerializableError = {
  message?: string,
  errors?: SerializableError[]
} & Record<string | number, any>

export type IsoErrorPlugin = {
  toSerializable(err: SerializableError): SerializableError | undefined,
  fromSerializable(jsonObj: Record<string | number, any>): Error | undefined,
}

const serializers: IsoErrorPlugin['toSerializable'][] = []
const deserializers: IsoErrorPlugin['fromSerializable'][] = []

// istanbul ignore next
// eslint-disable-next-line @typescript-eslint/unbound-method
const captureStackTrace = Error.captureStackTrace || function (error) {
  const container = new Error()

  Object.defineProperty(error, 'stack', {
    configurable: true,
    get: function () {
      // Replace property with value for faster future accesses.
      defineStack(this, container.stack)
      return container.stack
    },
    set: function (stack) { defineStack(error, stack) },
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
   * Error causes
   */
  errors?: IsoError[]

  constructor(message?: string, ...errors: Error[]) {
    super(message)

    // restore prototype chain
    const actualProto = new.target.prototype

    this.name = actualProto.constructor.name

    // istanbul ignore next
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else (this as any).__proto__ = actualProto

    if (errors.length > 0) this.errors = errors.map(toIsoError)
  }

  /**
   * Create an IsoError with additional properties without the need to create a new class.
   * @param props properties of the IsoError
   */
  static create<P extends { message: string, errors?: Error[] }>(props: P): IsoError & Pick<P, Exclude<keyof P, 'errors' | 'message'>> {
    const { message, errors = [], ...rest } = props
    const err = new IsoError(message, ...errors)
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
  static parse<P extends SerializableError = SerializableError>(text: string): IsoError & P {
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
  static deserialize<P extends SerializableError = SerializableError>(text: string): IsoError & P {
    const json = JSON.parse(text) as Record<string, any>
    const err = deserializeError<P>(json)

    captureStackTrace(err, IsoError.deserialize)
    return err
  }

  static fromSerializable<P extends SerializableError = SerializableError>(json: SerializableError): IsoError & P {
    const err = deserializeError<P>(json)

    captureStackTrace(err, IsoError.fromSerializable)
    return err
  }

  static addPlugin({ toSerializable: serialize, fromSerializable: deserialize }: IsoErrorPlugin) {
    serializers.unshift(serialize)
    deserializers.unshift(deserialize)
  }
  /**
   * returns the error message including the error causes.
   */
  static trace = trace

  toString() { return IsoError.serialize(this) }
}

function deserializeError<P extends SerializableError = SerializableError>(json: Record<string, any>): IsoError & P {
  let err: IsoError & P | undefined = undefined
  for (const d of deserializers) {
    err = d(json) as IsoError & P | undefined
    if (err) break
  }

  return err || deserializeIsoError(json)
}


function deserializeIsoError<
  P extends SerializableError = SerializableError
>({ message = '', errors = [], ...rest }: SerializableError): IsoError & P {
  // @ts-ignore
  return Object.assign(new IsoError(message, ...errors), rest)
}

export function toSerializableError(err: Error & { errors?: Error[] }): SerializableError {
  const { message, errors = [] } = err
  return { ...err, name: err.constructor.name, message, errors: errors.map(toSerializableError) }
}

// NOTE: In this function I have to to Object.assign to keep the err instance and its stack trace.
function toIsoError(err: Error) {
  if (err instanceof IsoError) return err

  // When the error is an internal error from deserialzation,
  // the err.constructor.name is object
  return Object.assign(err, { name: err.constructor.name !== 'Object' ? err.constructor.name : err.name })
}

export type Traceable = { name: string, message: string, module?: string, errors?: Traceable[] }

function trace(err: Traceable) {
  const messages = [`${err.name}${err.module ? `(${err.module})` : ''}: ${err.message}`]
  if (err.errors)
    err.errors.forEach(e => messages.push(...trace(e).split('\n').map(s => '  ' + s)))

  return messages.join('\n')
}

/**
 * An IsoError with a module property.
 */
export class ModuleError extends IsoError {
  /**
   * @param module The module that defines this error.
   */
  constructor(public module: string, description: string, ...errors: Error[]) {
    super(description, ...errors)
  }
}
