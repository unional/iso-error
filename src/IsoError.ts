import { captureStackTrace } from './captureStackTrace';

/**
 * Isomorphic Error that works across physical boundary.
 */
export class IsoError extends Error {
  /**
   * Name of the error
   */
  public name: string

  /**
   * Error causes
   */
  public errors?: IsoError[]

  constructor(message: string, ...errors: Error[]) {
    super(message)

    // restore prototype chain
    const actualProto = new.target.prototype

    this.name = actualProto.constructor.name

    // istanbul ignore next
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto)
    else (this as any).__proto__ = actualProto

    if (errors.length > 0)
      this.errors = errors.map(toIsoError)
  }

  /**
   * Create an IsoError with additional properties without the need to create a new class.
   * @param props properties of the IsoError
   */
  static create<P extends { message: string, errors?: Error[] }>(props: P): IsoError & Pick<P, Exclude<keyof P, 'errors' | 'message'>> {
    const { message, errors, ...rest } = props
    const err = errors ? new IsoError(message, ...errors) : new IsoError(message)
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
    const e = toSerializableError(err)
    return JSON.stringify(e)
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
}

function deserializeError<P extends Record<string | number, any> = Record<string | number, any>>(text: string): IsoError & P {
  const {
    message = '',
    errors,
    ...rest
  } = JSON.parse(text)

  const err = errors ? new IsoError(message, ...errors) : new IsoError(message)

  return Object.assign(err, rest)
}

function toSerializableError(err: IsoError): IsoError {
  const { message, errors } = err

  return errors ?
    { ...err, name: err.constructor.name, message, errors: errors.map(toSerializableError) } :
    { ...err, name: err.constructor.name, message }
}


/**
 * NOTE: In this function I have to to Object.assign to keep the err instance and its stack trace.
 */
function toIsoError(err: Error) {
  if (err instanceof IsoError) return err

  // When the error is an internal error from deserialzation,
  // the err.constructor.name is object
  // tslint:disable-next-line: strict-type-predicates
  const name = err.constructor.name !== 'Object' ?
    err.constructor.name :
    err.name

  return Object.assign(err, {
    name
  })
}
