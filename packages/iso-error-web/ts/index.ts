import { IsoError, ModuleError, type IsoErrorPlugin } from 'iso-error'

export class HttpError extends ModuleError {
	constructor(public status: number, message: string, options?: IsoError.Options) {
		super('iso-error-web/http', message, options)
	}
}
export class MultipleChoices extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(300, message, options)
	}
}

export class MovedPermanently extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(301, message, options)
	}
}

export class Found extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(302, message, options)
	}
}

export class SeeOther extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(303, message, options)
	}
}

export class NotModified extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(304, message, options)
	}
}

export class UseProxy extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(305, message, options)
	}
}

export class Unused extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(306, message, options)
	}
}

export class TemporaryRedirect extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(307, message, options)
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

export class PaymentRequired extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(402, message, options)
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

export class NotAcceptable extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(406, message, options)
	}
}

export class ProxyAuthenticationRequired extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(407, message, options)
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

export class LengthRequired extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(411, message, options)
	}
}

export class PreconditionFailed extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(412, message, options)
	}
}

export class PayloadTooLarge extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(413, message, options)
	}
}

export class UriTooLong extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(414, message, options)
	}
}

export class UnsupportedMediaType extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(415, message, options)
	}
}

export class RangeNotSatisfiable extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(416, message, options)
	}
}

export class ExpectationFailed extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(417, message, options)
	}
}

export class IAmATeapot extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(418, message, options)
	}
}
export class MisdirectedRequest extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(421, message, options)
	}
}
export class UnprocessableEntity extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(422, message, options)
	}
}

export class Locked extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(423, message, options)
	}
}

export class FailedDependency extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(424, message, options)
	}
}
export class TooEarly extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(425, message, options)
	}
}
export class UpgradeRequired extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(426, message, options)
	}
}
export class PreconditionRequired extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(428, message, options)
	}
}
export class TooManyRequests extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(429, message, options)
	}
}
export class RequestHeaderFieldsTooLarge extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(431, message, options)
	}
}
export class UnavailableForLegalReasons extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(451, message, options)
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
export class HttpVersionNotSupported extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(505, message, options)
	}
}
export class VariantAlsoNegotiates extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(506, message, options)
	}
}
export class InsufficientStorage extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(507, message, options)
	}
}
export class LoopDetected extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(508, message, options)
	}
}
export class NotExtended extends HttpError {
	constructor(message: string, options?: IsoError.Options) {
		super(510, message, options)
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
	MultipleChoices = 300,
	MovedPermanently = 301,
	Found = 302,
	SeeOther = 303,
	NotModified = 304,
	UseProxy = 305,
	Unused = 306,
	TemporaryRedirect = 307,
	PermanentRedirect = 308,
	BadRequest = 400,
	Unauthorized = 401,
	PaymentRequired = 402,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	NotAcceptable = 406,
	ProxyAuthenticationRequired = 407,
	RequestTimeout = 408,
	Conflict = 409,
	Gone = 410,
	LengthRequired = 411,
	PreconditionFailed = 412,
	PayloadTooLarge = 413,
	UriTooLong = 414,
	UnsupportedMediaType = 415,
	RangeNotSatisfiable = 416,
	ExpectationFailed = 417,
	IAmATeapot = 418,
	MisdirectedRequest = 421,
	UnprocessableEntity = 422,
	Locked = 423,
	FailedDependency = 424,
	TooEarly = 425,
	UpgradeRequired = 426,
	PreconditionRequired = 428,
	TooManyRequests = 429,
	RequestHeaderFieldsTooLarge = 431,
	UnavailableForLegalReasons = 451,
	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504,
	HttpVersionNotSupported = 505,
	VariantAlsoNegotiates = 506,
	InsufficientStorage = 507,
	LoopDetected = 508,
	NotExtended = 510,
	NetworkAuthenticationRequired = 511
}

export function createHttpError(status: number, message: string, options?: IsoError.Options) {
	switch (status) {
		case HttpStatus.MultipleChoices:
			return new MultipleChoices(message, options)
		case HttpStatus.MovedPermanently:
			return new MovedPermanently(message, options)
		case HttpStatus.Found:
			return new Found(message, options)
		case HttpStatus.SeeOther:
			return new SeeOther(message, options)
		case HttpStatus.NotModified:
			return new NotModified(message, options)
		case HttpStatus.UseProxy:
			return new UseProxy(message, options)
		case HttpStatus.Unused:
			return new Unused(message, options)
		case HttpStatus.TemporaryRedirect:
			return new TemporaryRedirect(message, options)
		case HttpStatus.PermanentRedirect:
			return new PermanentRedirect(message, options)
		case HttpStatus.BadRequest:
			return new BadRequest(message, options)
		case HttpStatus.Unauthorized:
			return new Unauthorized(message, options)
		case HttpStatus.PaymentRequired:
			return new PaymentRequired(message, options)
		case HttpStatus.Forbidden:
			return new Forbidden(message, options)
		case HttpStatus.NotFound:
			return new NotFound(message, options)
		case HttpStatus.MethodNotAllowed:
			return new MethodNotAllowed(message, options)
		case HttpStatus.NotAcceptable:
			return new NotAcceptable(message, options)
		case HttpStatus.ProxyAuthenticationRequired:
			return new ProxyAuthenticationRequired(message, options)
		case HttpStatus.RequestTimeout:
			return new RequestTimeout(message, options)
		case HttpStatus.Conflict:
			return new Conflict(message, options)
		case HttpStatus.Gone:
			return new Gone(message, options)
		case HttpStatus.LengthRequired:
			return new LengthRequired(message, options)
		case HttpStatus.PreconditionFailed:
			return new PreconditionFailed(message, options)
		case HttpStatus.PayloadTooLarge:
			return new PayloadTooLarge(message, options)
		case HttpStatus.UriTooLong:
			return new UriTooLong(message, options)
		case HttpStatus.UnsupportedMediaType:
			return new UnsupportedMediaType(message, options)
		case HttpStatus.RangeNotSatisfiable:
			return new RangeNotSatisfiable(message, options)
		case HttpStatus.ExpectationFailed:
			return new ExpectationFailed(message, options)
		case HttpStatus.IAmATeapot:
			return new IAmATeapot(message, options)
		case HttpStatus.MisdirectedRequest:
			return new MisdirectedRequest(message, options)
		case HttpStatus.UnprocessableEntity:
			return new UnprocessableEntity(message, options)
		case HttpStatus.Locked:
			return new Locked(message, options)
		case HttpStatus.FailedDependency:
			return new FailedDependency(message, options)
		case HttpStatus.TooEarly:
			return new TooEarly(message, options)
		case HttpStatus.UpgradeRequired:
			return new UpgradeRequired(message, options)
		case HttpStatus.PreconditionRequired:
			return new PreconditionRequired(message, options)
		case HttpStatus.TooManyRequests:
			return new TooManyRequests(message, options)
		case HttpStatus.RequestHeaderFieldsTooLarge:
			return new RequestHeaderFieldsTooLarge(message, options)
		case HttpStatus.UnavailableForLegalReasons:
			return new UnavailableForLegalReasons(message, options)
		case HttpStatus.InternalServerError:
			return new InternalServerError(message, options)
		case HttpStatus.NotImplemented:
			return new NotImplemented(message, options)
		case HttpStatus.BadGateway:
			return new BadGateway(message, options)
		case HttpStatus.ServiceUnavailable:
			return new ServiceUnavailable(message, options)
		case HttpStatus.GatewayTimeout:
			return new GatewayTimeout(message, options)
		case HttpStatus.HttpVersionNotSupported:
			return new HttpVersionNotSupported(message, options)
		case HttpStatus.VariantAlsoNegotiates:
			return new VariantAlsoNegotiates(message, options)
		case HttpStatus.InsufficientStorage:
			return new InsufficientStorage(message, options)
		case HttpStatus.LoopDetected:
			return new LoopDetected(message, options)
		case HttpStatus.NotExtended:
			return new NotExtended(message, options)
		case HttpStatus.NetworkAuthenticationRequired:
			return new NetworkAuthenticationRequired(message, options)
		// istanbul ignore next
		default:
			return new HttpError(status, message, options)
	}
}

export const webPlugin: IsoErrorPlugin = {
	toSerializable(err) {
		if (err instanceof HttpError)
			return {
				name: err.name,
				module: err.module,
				status: err.status,
				message: err.message
			}
		return undefined
	},
	fromSerializable(obj) {
		switch (obj['name']) {
			case 'MultipleChoices':
				return new MultipleChoices(obj['message'])
			case 'MovedPermanently':
				return new MovedPermanently(obj['message'])
			case 'Found':
				return new Found(obj['message'])
			case 'SeeOther':
				return new SeeOther(obj['message'])
			case 'NotModified':
				return new NotModified(obj['message'])
			case 'UseProxy':
				return new UseProxy(obj['message'])
			case 'Unused':
				return new Unused(obj['message'])
			case 'TemporaryRedirect':
				return new TemporaryRedirect(obj['message'])
			case 'PermanentRedirect':
				return new PermanentRedirect(obj['message'])
			case 'BadRequest':
				return new BadRequest(obj['message'])
			case 'Unauthorized':
				return new Unauthorized(obj['message'])
			case 'PaymentRequired':
				return new PaymentRequired(obj['message'])
			case 'Forbidden':
				return new Forbidden(obj['message'])
			case 'NotFound':
				return new NotFound(obj['message'])
			case 'MethodNotAllowed':
				return new MethodNotAllowed(obj['message'])
			case 'NotAcceptable':
				return new NotAcceptable(obj['message'])
			case 'ProxyAuthenticationRequired':
				return new ProxyAuthenticationRequired(obj['message'])
			case 'RequestTimeout':
				return new RequestTimeout(obj['message'])
			case 'Conflict':
				return new Conflict(obj['message'])
			case 'Gone':
				return new Gone(obj['message'])
			case 'LengthRequired':
				return new LengthRequired(obj['message'])
			case 'PreconditionFailed':
				return new PreconditionFailed(obj['message'])
			case 'PayloadTooLarge':
				return new PayloadTooLarge(obj['message'])
			case 'UriTooLong':
				return new UriTooLong(obj['message'])
			case 'UnsupportedMediaType':
				return new UnsupportedMediaType(obj['message'])
			case 'RangeNotSatisfiable':
				return new RangeNotSatisfiable(obj['message'])
			case 'ExpectationFailed':
				return new ExpectationFailed(obj['message'])
			case 'IAmATeapot':
				return new IAmATeapot(obj['message'])
			case 'MisdirectedRequest':
				return new MisdirectedRequest(obj['message'])
			case 'UnprocessableEntity':
				return new UnprocessableEntity(obj['message'])
			case 'Locked':
				return new Locked(obj['message'])
			case 'FailedDependency':
				return new FailedDependency(obj['message'])
			case 'TooEarly':
				return new TooEarly(obj['message'])
			case 'UpgradeRequired':
				return new UpgradeRequired(obj['message'])
			case 'PreconditionRequired':
				return new PreconditionRequired(obj['message'])
			case 'TooManyRequests':
				return new TooManyRequests(obj['message'])
			case 'RequestHeaderFieldsTooLarge':
				return new RequestHeaderFieldsTooLarge(obj['message'])
			case 'UnavailableForLegalReasons':
				return new UnavailableForLegalReasons(obj['message'])
			case 'InternalServerError':
				return new InternalServerError(obj['message'])
			case 'NotImplemented':
				return new NotImplemented(obj['message'])
			case 'BadGateway':
				return new BadGateway(obj['message'])
			case 'ServiceUnavailable':
				return new ServiceUnavailable(obj['message'])
			case 'GatewayTimeout':
				return new GatewayTimeout(obj['message'])
			case 'HttpVersionNotSupported':
				return new HttpVersionNotSupported(obj['message'])
			case 'VariantAlsoNegotiates':
				return new VariantAlsoNegotiates(obj['message'])
			case 'InsufficientStorage':
				return new InsufficientStorage(obj['message'])
			case 'LoopDetected':
				return new LoopDetected(obj['message'])
			case 'NotExtended':
				return new NotExtended(obj['message'])
			case 'NetworkAuthenticationRequired':
				return new NetworkAuthenticationRequired(obj['message'])
			default:
				return undefined
		}
	}
}

export default webPlugin
