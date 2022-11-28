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
  /**
   * Deserialize an `Error` from `Serializable`
   */
  fromSerializable(jsonObj: Record<string | number, any>): Error | undefined,
  /**
   * Serialize `Error` to `Serializable`
   */
  toSerializable(err: Error): IsoError.Serializable | undefined,
}

export class SerializableConverter {
  #plugins: IsoErrorPlugin[] = []
  addPlugin(plugin: IsoErrorPlugin) {
    this.#plugins.unshift(plugin)
  }
  /**
   * Deserialize an `Error` from `Serializable`
   */
  fromSerializable<
    E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause
  >(json: Record<string | number, any>, options?: { ssf: (...args: any) => any }) {
    const err = this.#deserializeError<E>(json)

    Error.captureStackTrace(err, options?.ssf)
    return err
  }

  #fromSerializable<
    E extends IsoError.ErrorWithCause
  >(json: Record<string | number, any>): E {
    if (json.name === 'AggregateError') {
      const { message, errors, ...rest } = json as unknown as { message: string, errors: any[] }
      // @ts-ignore
      if (global.AggregateError) {
        return Object.assign(
          new AggregateError(errors as unknown as any, message),
          rest
        ) as unknown as E
      }
      else {
        return Object.assign(new Error(message), {
          ...rest,
          errors
        }) as unknown as E
      }
    }

    const { message, cause, ...rest } = json
    const causeError = cause ? this.#deserializeError(cause as Error) : undefined

    if (json.name === 'Error') {
      return Object.assign(new Error(message), causeError ? { ...rest, cause: causeError } : rest) as E
    }

    // @ts-ignore
    return Object.assign(new IsoError(message, causeError ? { cause: causeError } : undefined), rest)
  }

  #deserializeError<
    E extends IsoError.ErrorWithCause
  >(json: Record<string | number, any>): E {
    let err: E | undefined = undefined
    for (const { fromSerializable } of this.#plugins) {
      err = fromSerializable(json) as E | undefined
      if (err) break
    }

    return err || this.#fromSerializable<E>(json)
  }

  /**
   * Serialize `Error` to `Serializable`
   */
  toSerializable(err: Error) {
    return this.#plugins.reduce<IsoError.Serializable | undefined>(
      (p, s) => p || s.toSerializable(err),
      undefined
    ) || this.#toSerializable(err)
  }

  #toSerializable(err: Error & { cause?: Error }): IsoError.Serializable {
    if (isAggregateError(err)) {
      return {
        ...err, name: err.constructor.name, message: err.message,
        errors: err.errors.map(this.#toSerializable)
      }
    }
    if (err instanceof Error) {
      const { message, cause } = err
      return cause
        ? { ...err, name: err.constructor.name, message, cause: this.#toSerializable(cause) }
        : { ...err, name: err.constructor.name, message }
    }
    return err
  }
}

/**
 * Isomorphic Error that works across physical boundary.
 */
export class IsoError extends Error {
  /**
   * Create an IsoError with additional properties without the need to create a new class.
   * @param props properties of the IsoError
   */
  static create<
    P extends { message: string, cause?: Error }
  >(props: P): IsoError & Pick<P, Exclude<keyof P, 'cause' | 'message'>> {
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

  static toSerializable(err: Error) {
    return this.converter.toSerializable(err)
  }

  /**
   * @type P Additional properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static parse<E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause>(text: string): E {
    const json = JSON.parse(text) as IsoError.Serializable
    return this.converter.fromSerializable(json, { ssf: IsoError.parse })
  }

  /**
   * @type P Additional properties of the IsoError
   * @param text Json representation of a IsoError
   */
  static deserialize<
    E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause
  >(text: string): E {
    const json = JSON.parse(text) as IsoError.Serializable
    return this.converter.fromSerializable(json, { ssf: IsoError.deserialize })
  }

  static fromSerializable<
    E extends IsoError.ErrorWithCause = IsoError.ErrorWithCause
  >(json: IsoError.Serializable): E {
    return this.converter.fromSerializable(json, { ssf: IsoError.fromSerializable })
  }
  /**
   * returns the error message including the error causes.
   */
  static trace(err: Error) {
    const messages: string[] = []
    if (err instanceof ModuleError) {
      messages.push(`${err.name}(${err.module}): ${err.message}`)
    }
    else if (err instanceof Error) {
      messages.push(`${err.name}: ${err.message}`)
    }

    if (isAggregateError(err)) {
      err.errors.forEach(e => messages.push(...this.trace(e).split('\n').map(s => '  ' + s)))
    }
    if (err instanceof Error) {
      if (this.#hasCause(err)) messages.push(...this.trace(err.cause).split('\n').map(s => '  ' + s))
    }
    else {
      messages.push(typeof err === 'string' ? err : JSON.stringify(err))
    }

    return messages.join('\n')
  }

  static #hasCause(x: any): x is { cause: Error } {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return !!x.cause
  }

  static addPlugin(plugin: IsoErrorPlugin) {
    this.converter.addPlugin(plugin)
  }

  // NOTE: In this function I have to to Object.assign to keep the err instance and its stack trace.
  static #toIsoError(err: Error) {
    if (err instanceof IsoError) return err

    // When the error is an internal error from deserialzation,
    // the err.constructor.name is object
    return Object.assign(
      err,
      { name: err.constructor.name !== 'Object' ? err.constructor.name : err.name }
    )
  }

  static converter = new SerializableConverter()

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

    // restore prototype chain
    const actualProto = new.target.prototype

    this.name = actualProto.constructor.name

    // istanbul ignore next
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else (this as any).__proto__ = actualProto

    if (options?.cause) this.cause = IsoError.#toIsoError(options.cause)
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

  /**
   * Data structure that is used to pass Error accross physical boundary.
   *
   * This is the logical structure,
   * not necessary the physical representation.
   *
   * For example, the physical representation can be JSON, Flatted,
   * or blob.
   */
  export type Serializable = {
    name: string,
    message?: string,
    cause?: Serializable
  } & Record<string | number, any>
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

export namespace ModuleError {
  export type Options = IsoError.Options
}

export function isAggregateError(error: Error | unknown): error is Error & { errors: Error[] } {
  return error instanceof Error && Array.isArray((error as any).errors)
}
