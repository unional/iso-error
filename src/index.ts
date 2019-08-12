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

  constructor(message: string, ...errors: Error[]) {
    super(message)

    // restore prototype chain
    const actualProto = new.target.prototype

    this.name = actualProto.constructor.name

    // istanbul ignore next
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto)
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
   * @type P Additonal properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static parse<P extends Record<string | number, any> = Record<string | number, any>>(text: string): IsoError & P {
    const err = deserializeError<P>(text)

    captureStackTrace(err, IsoError.parse)
    return err
  }

  static serialize(err: Error) {
    return JSON.stringify(toSerializableError(err))
  }

  /**
   * @type P Additonal properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static deserialize<P extends Record<string | number, any> = Record<string | number, any>>(text: string): IsoError & P {
    const err = deserializeError<P>(text)

    captureStackTrace(err, IsoError.deserialize)
    return err
  }

  /**
   * returns the error message including the error causes.
   */
  static trace = trace

  toString() {
    return IsoError.serialize(this)
  }
}

function deserializeError<P extends Record<string | number, any> = Record<string | number, any>>(text: string): IsoError & P {
  const {
    message = '',
    errors = [],
    ...rest
  } = JSON.parse(text)

  return Object.assign(new IsoError(message, ...errors), rest)
}

function toSerializableError(err: { message: string, errors?: any }) {
  const { message, errors = [] } = err

  return { ...err, name: err.constructor.name, message, errors: errors.map(toSerializableError) }
}

// NOTE: In this function I have to to Object.assign to keep the err instance and its stack trace.
function toIsoError(err: Error) {
  if (err instanceof IsoError) return err

  // When the error is an internal error from deserialzation,
  // the err.constructor.name is object
  // tslint:disable-next-line: strict-type-predicates
  const name = err.constructor.name !== 'Object' ? err.constructor.name : err.name

  return Object.assign(err, { name })
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

// istanbul ignore next
const captureStackTrace = Error.captureStackTrace || function (error) {
  const container = new Error();

  Object.defineProperty(error, 'stack', {
    configurable: true,
    get: function () {
      // Replace property with value for faster future accesses.
      defineStack(this, container.stack)
      return container.stack;
    },
    set: function (stack) { defineStack(error, stack) }
  });
}

// istanbul ignore next
function defineStack(target: Object, value: string | undefined) {
  Object.defineProperty(target, 'stack', {
    configurable: true,
    value,
    writable: true
  });
}
