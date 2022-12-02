import { IsoError, IsoErrorPlugin, ModuleError } from 'iso-error'

export class HttpError extends ModuleError {
  constructor(public status: number, message: string, options?: IsoError.Options) {
    super('iso-error-http', message, options)
  }
}

export class PermanentRedirect extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(308, message, options)
  }
}

export class BadRequest extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(400, message, options)
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(401, message, options)
  }
}

export class Forbidden extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(403, message, options)
  }
}

export class NotFound extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(404, message, options)
  }
}

export class MethodNotAllowed extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(405, message, options)
  }
}

export class RequestTimeout extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(408, message, options)
  }
}

export class Conflict extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(409, message, options)
  }
}

export class Gone extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(410, message, options)
  }
}

export class PayloadTooLarge extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(413, message, options)
  }
}

export class UnsupportedMediaType extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(415, message, options)
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(500, message, options)
  }
}
export class NotImplemented extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(501, message, options)
  }
}
export class BadGateway extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(502, message, options)
  }
}
export class ServiceUnavailable extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(503, message, options)
  }
}
export class GatewayTimeout extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(504, message, options)
  }
}
export class NetworkAuthenticationRequired extends HttpError {
  constructor(message: string, options?: IsoError.Options) {
    super(511, message, options)
  }
}


/**
 * @see <https://developer.mozilla.org/en-US/docs/Web/HTTP/Status>
 */
export enum HttpStatus {
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  PayloadTooLarge = 413,
  UnsupportedMediaType = 415,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  NetworkAuthenticationRequired = 511,
}

export function createHttpError(status: number, message: string, options?: IsoError.Options) {
  switch (status) {
    case HttpStatus.PermanentRedirect: return new PermanentRedirect(message, options)
    case HttpStatus.BadRequest: return new BadRequest(message, options)
    case HttpStatus.Unauthorized: return new Unauthorized(message, options)
    case HttpStatus.Forbidden: return new Forbidden(message, options)
    case HttpStatus.NotFound: return new NotFound(message, options)
    case HttpStatus.MethodNotAllowed: return new MethodNotAllowed(message, options)
    case HttpStatus.RequestTimeout: return new RequestTimeout(message, options)
    case HttpStatus.Conflict: return new Conflict(message, options)
    case HttpStatus.Gone: return new Gone(message, options)
    case HttpStatus.PayloadTooLarge: return new PayloadTooLarge(message, options)
    case HttpStatus.UnsupportedMediaType: return new UnsupportedMediaType(message, options)
    case HttpStatus.InternalServerError: return new InternalServerError(message, options)
    case HttpStatus.NotImplemented: return new NotImplemented(message, options)
    case HttpStatus.BadGateway: return new BadGateway(message, options)
    case HttpStatus.ServiceUnavailable: return new ServiceUnavailable(message, options)
    case HttpStatus.GatewayTimeout: return new GatewayTimeout(message, options)
    case HttpStatus.NetworkAuthenticationRequired: return new NetworkAuthenticationRequired(message, options)
    // istanbul ignore next
    default: return new HttpError(status, message, options)
  }
}

const webPlugin: IsoErrorPlugin = {
  toSerializable(err) {
    if (err instanceof HttpError) return {
      name: err.name,
      module: err.module,
      status: err.status,
      message: err.message
    }
    return undefined
  },
  fromSerializable(obj) {
    switch (obj.name) {
      case 'PermanentRedirect': return new PermanentRedirect(obj.message)
      case 'BadRequest': return new BadRequest(obj.message)
      case 'Unauthorized': return new Unauthorized(obj.message)
      case 'Forbidden': return new Forbidden(obj.message)
      case 'NotFound': return new NotFound(obj.message)
      case 'MethodNotAllowed': return new MethodNotAllowed(obj.message)
      case 'RequestTimeout': return new RequestTimeout(obj.message)
      case 'Conflict': return new Conflict(obj.message)
      case 'Gone': return new Gone(obj.message)
      case 'PayloadTooLarge': return new PayloadTooLarge(obj.message)
      case 'UnsupportedMediaType': return new UnsupportedMediaType(obj.message)
      case 'InternalServerError': return new InternalServerError(obj.message)
      case 'NotImplemented': return new NotImplemented(obj.message)
      case 'BadGateway': return new BadGateway(obj.message)
      case 'ServiceUnavailable': return new ServiceUnavailable(obj.message)
      case 'GatewayTimeout': return new GatewayTimeout(obj.message)
      case 'NetworkAuthenticationRequired': return new NetworkAuthenticationRequired(obj.message)
      default: return undefined
    }
  }
}

export default webPlugin
