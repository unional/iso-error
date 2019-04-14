import { captureStackTrace } from './captureStackTrace';

export class IsoError extends Error {
  /**
   * Type of the error
   */
  public type: string
  /**
   * Error code for the specific type of the error
   */
  public code: string

  /**
   * Internal errors.
   */
  public errors?: IsoError[]

  /**
   * @param code a machine readable error code
   * @param description a human readable description
   */
  constructor(code: string | number, public description: string, ...errors: Error[]) {
    super(description)

    this.code = String(code)

    // restore prototype chain
    const actualProto = new.target.prototype;

    this.type = actualProto.constructor.name

    // istanbul ignore next
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto)
    else (this as any).__proto__ = actualProto

    if (errors.length > 0)
      this.errors = errors.map(toIsoError)
  }

  static stringify(e: IsoError) {
    return JSON.stringify(e)
  }

  static parse(text: string): IsoError & Record<string | number, any> {
    const {
      code = '',
      type = 'IsoError',
      description = '',
      errors = [],
      ...rest
    } = JSON.parse(text)

    const err = new IsoError(code, description, ...errors)
    err.type = type

    captureStackTrace(err, IsoError.parse)
    return Object.assign(err, { ...rest })
  }
}

function toIsoError(err: Error) {
  return Object.assign(err, {
    type: err.constructor.name,
    code: '',
    description: err.message
  })
}
