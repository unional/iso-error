import { IsoError } from 'iso-error'
import type { AnyConstructor } from 'type-plus'
import {
	BadGateway,
	BadRequest,
	Conflict,
	createHttpError,
	ExpectationFailed,
	FailedDependency,
	Forbidden,
	Found,
	GatewayTimeout,
	Gone,
	HttpStatus,
	HttpVersionNotSupported,
	IAmATeapot,
	InsufficientStorage,
	InternalServerError,
	LengthRequired,
	Locked,
	LoopDetected,
	MethodNotAllowed,
	MisdirectedRequest,
	MovedPermanently,
	MultipleChoices,
	NetworkAuthenticationRequired,
	NotAcceptable,
	NotExtended,
	NotFound,
	NotImplemented,
	NotModified,
	PayloadTooLarge,
	PaymentRequired,
	PermanentRedirect,
	PreconditionFailed,
	PreconditionRequired,
	ProxyAuthenticationRequired,
	RangeNotSatisfiable,
	RequestHeaderFieldsTooLarge,
	RequestTimeout,
	SeeOther,
	ServiceUnavailable,
	TemporaryRedirect,
	TooEarly,
	TooManyRequests,
	Unauthorized,
	UnavailableForLegalReasons,
	UnprocessableEntity,
	UnsupportedMediaType,
	Unused,
	UpgradeRequired,
	UriTooLong,
	UseProxy,
	VariantAlsoNegotiates,
	webPlugin
} from './index.js'

describe('HttpStatus', () => {
	it('defines Http status code', () => {
		expect(HttpStatus.MultipleChoices).toBe(300)
		expect(HttpStatus.MovedPermanently).toBe(301)
		expect(HttpStatus.Found).toBe(302)
		expect(HttpStatus.SeeOther).toBe(303)
		expect(HttpStatus.NotModified).toBe(304)
		expect(HttpStatus.UseProxy).toBe(305)
		expect(HttpStatus.Unused).toBe(306)
		expect(HttpStatus.TemporaryRedirect).toBe(307)
		expect(HttpStatus.PermanentRedirect).toBe(308)
		expect(HttpStatus.BadRequest).toBe(400)
		expect(HttpStatus.Unauthorized).toBe(401)
		expect(HttpStatus.PaymentRequired).toBe(402)
		expect(HttpStatus.Forbidden).toBe(403)
		expect(HttpStatus.NotFound).toBe(404)
		expect(HttpStatus.MethodNotAllowed).toBe(405)
		expect(HttpStatus.NotAcceptable).toBe(406)
		expect(HttpStatus.ProxyAuthenticationRequired).toBe(407)
		expect(HttpStatus.RequestTimeout).toBe(408)
		expect(HttpStatus.Conflict).toBe(409)
		expect(HttpStatus.Gone).toBe(410)
		expect(HttpStatus.LengthRequired).toBe(411)
		expect(HttpStatus.PreconditionFailed).toBe(412)
		expect(HttpStatus.PayloadTooLarge).toBe(413)
		expect(HttpStatus.UriTooLong).toBe(414)
		expect(HttpStatus.UnsupportedMediaType).toBe(415)
		expect(HttpStatus.RangeNotSatisfiable).toBe(416)
		expect(HttpStatus.ExpectationFailed).toBe(417)
		expect(HttpStatus.IAmATeapot).toBe(418)
		expect(HttpStatus.MisdirectedRequest).toBe(421)
		expect(HttpStatus.UnprocessableEntity).toBe(422)
		expect(HttpStatus.Locked).toBe(423)
		expect(HttpStatus.FailedDependency).toBe(424)
		expect(HttpStatus.TooEarly).toBe(425)
		expect(HttpStatus.UpgradeRequired).toBe(426)
		expect(HttpStatus.PreconditionRequired).toBe(428)
		expect(HttpStatus.TooManyRequests).toBe(429)
		expect(HttpStatus.RequestHeaderFieldsTooLarge).toBe(431)
		expect(HttpStatus.UnavailableForLegalReasons).toBe(451)
		expect(HttpStatus.InternalServerError).toBe(500)
		expect(HttpStatus.NotImplemented).toBe(501)
		expect(HttpStatus.BadGateway).toBe(502)
		expect(HttpStatus.ServiceUnavailable).toBe(503)
		expect(HttpStatus.GatewayTimeout).toBe(504)
		expect(HttpStatus.HttpVersionNotSupported).toBe(505)
		expect(HttpStatus.VariantAlsoNegotiates).toBe(506)
		expect(HttpStatus.InsufficientStorage).toBe(507)
		expect(HttpStatus.LoopDetected).toBe(508)
		expect(HttpStatus.NotExtended).toBe(510)
		expect(HttpStatus.NetworkAuthenticationRequired).toBe(511)
	})
})

describe('createHttpError()', () => {
	testCreateHttpError(MultipleChoices, HttpStatus.MultipleChoices, 'some message')
	testCreateHttpError(MovedPermanently, HttpStatus.MovedPermanently, 'some message')
	testCreateHttpError(Found, HttpStatus.Found, 'some message')
	testCreateHttpError(SeeOther, HttpStatus.SeeOther, 'some message')
	testCreateHttpError(NotModified, HttpStatus.NotModified, 'some message')
	testCreateHttpError(UseProxy, HttpStatus.UseProxy, 'some message')
	testCreateHttpError(Unused, HttpStatus.Unused, 'some message')
	testCreateHttpError(TemporaryRedirect, HttpStatus.TemporaryRedirect, 'some message')
	testCreateHttpError(PermanentRedirect, HttpStatus.PermanentRedirect, 'premanent redirected')

	testCreateHttpError(BadRequest, HttpStatus.BadRequest, 'bad request')
	testCreateHttpError(Unauthorized, HttpStatus.Unauthorized, 'not authorized')
	testCreateHttpError(PaymentRequired, HttpStatus.PaymentRequired, 'some message')
	testCreateHttpError(Forbidden, HttpStatus.Forbidden, 'forbidden')
	testCreateHttpError(NotFound, HttpStatus.NotFound, 'value not found')
	testCreateHttpError(MethodNotAllowed, HttpStatus.MethodNotAllowed, 'OPTION method not allowed')
	testCreateHttpError(NotAcceptable, HttpStatus.NotAcceptable, 'some message')
	testCreateHttpError(
		ProxyAuthenticationRequired,
		HttpStatus.ProxyAuthenticationRequired,
		'some message'
	)
	testCreateHttpError(RequestTimeout, HttpStatus.RequestTimeout, 'request timed out')
	testCreateHttpError(Conflict, HttpStatus.Conflict, 'conflict detected')
	testCreateHttpError(Gone, HttpStatus.Gone, 'entry is gone')
	testCreateHttpError(LengthRequired, HttpStatus.LengthRequired, 'some message')
	testCreateHttpError(PreconditionFailed, HttpStatus.PreconditionFailed, 'some message')
	testCreateHttpError(PayloadTooLarge, HttpStatus.PayloadTooLarge, 'paylog over limit')
	testCreateHttpError(UriTooLong, HttpStatus.UriTooLong, 'some message')
	testCreateHttpError(
		UnsupportedMediaType,
		HttpStatus.UnsupportedMediaType,
		'media type: xml not supported'
	)
	testCreateHttpError(RangeNotSatisfiable, HttpStatus.RangeNotSatisfiable, 'some message')
	testCreateHttpError(ExpectationFailed, HttpStatus.ExpectationFailed, 'some message')
	testCreateHttpError(IAmATeapot, HttpStatus.IAmATeapot, 'some message')
	testCreateHttpError(MisdirectedRequest, HttpStatus.MisdirectedRequest, 'some message')
	testCreateHttpError(UnprocessableEntity, HttpStatus.UnprocessableEntity, 'some message')
	testCreateHttpError(Locked, HttpStatus.Locked, 'some message')
	testCreateHttpError(FailedDependency, HttpStatus.FailedDependency, 'some message')
	testCreateHttpError(TooEarly, HttpStatus.TooEarly, 'some message')
	testCreateHttpError(UpgradeRequired, HttpStatus.UpgradeRequired, 'some message')
	testCreateHttpError(PreconditionRequired, HttpStatus.PreconditionRequired, 'some message')
	testCreateHttpError(TooManyRequests, HttpStatus.TooManyRequests, 'some message')
	testCreateHttpError(
		RequestHeaderFieldsTooLarge,
		HttpStatus.RequestHeaderFieldsTooLarge,
		'some message'
	)
	testCreateHttpError(
		UnavailableForLegalReasons,
		HttpStatus.UnavailableForLegalReasons,
		'some message'
	)

	testCreateHttpError(InternalServerError, HttpStatus.InternalServerError, 'internal server error')
	testCreateHttpError(NotImplemented, HttpStatus.NotImplemented, 'not implemented')
	testCreateHttpError(BadGateway, HttpStatus.BadGateway, 'bad gateway')
	testCreateHttpError(ServiceUnavailable, HttpStatus.ServiceUnavailable, 'service unavailable')
	testCreateHttpError(GatewayTimeout, HttpStatus.GatewayTimeout, 'gateway timeout')
	testCreateHttpError(HttpVersionNotSupported, HttpStatus.HttpVersionNotSupported, 'some message')
	testCreateHttpError(VariantAlsoNegotiates, HttpStatus.VariantAlsoNegotiates, 'some message')
	testCreateHttpError(InsufficientStorage, HttpStatus.InsufficientStorage, 'some message')
	testCreateHttpError(LoopDetected, HttpStatus.LoopDetected, 'some message')
	testCreateHttpError(NotExtended, HttpStatus.NotExtended, 'some message')
	testCreateHttpError(
		NetworkAuthenticationRequired,
		HttpStatus.NetworkAuthenticationRequired,
		'network auth required'
	)
})

function testCreateHttpError(ErrorClass: AnyConstructor, status: number, message: string) {
	it(`supports ${ErrorClass.name}`, () => assertCreateHttpError(ErrorClass, status, message))
}

function assertCreateHttpError(ErrorClass: AnyConstructor, status: number, message: string) {
	const a = createHttpError(status, message)
	expect(a.name).toBe(ErrorClass.name)
	expect(a).toBeInstanceOf(ErrorClass)
	expect(a.status).toBe(status)
	expect(a.message).toBe(message)
}

describe(`webPlugin`, () => {
	it('restores instanceOf check', () => {
		IsoError.addPlugin(webPlugin)

		assertDeserializeRestoresInstanceOf(MultipleChoices)
		assertDeserializeRestoresInstanceOf(MovedPermanently)
		assertDeserializeRestoresInstanceOf(Found)
		assertDeserializeRestoresInstanceOf(SeeOther)
		assertDeserializeRestoresInstanceOf(NotModified)
		assertDeserializeRestoresInstanceOf(UseProxy)
		assertDeserializeRestoresInstanceOf(Unused)
		assertDeserializeRestoresInstanceOf(TemporaryRedirect)
		assertDeserializeRestoresInstanceOf(PermanentRedirect)
		assertDeserializeRestoresInstanceOf(BadRequest)
		assertDeserializeRestoresInstanceOf(Unauthorized)
		assertDeserializeRestoresInstanceOf(PaymentRequired)
		assertDeserializeRestoresInstanceOf(Forbidden)
		assertDeserializeRestoresInstanceOf(NotFound)
		assertDeserializeRestoresInstanceOf(MethodNotAllowed)
		assertDeserializeRestoresInstanceOf(NotAcceptable)
		assertDeserializeRestoresInstanceOf(ProxyAuthenticationRequired)
		assertDeserializeRestoresInstanceOf(RequestTimeout)
		assertDeserializeRestoresInstanceOf(Conflict)
		assertDeserializeRestoresInstanceOf(Gone)
		assertDeserializeRestoresInstanceOf(LengthRequired)
		assertDeserializeRestoresInstanceOf(PreconditionFailed)
		assertDeserializeRestoresInstanceOf(PayloadTooLarge)
		assertDeserializeRestoresInstanceOf(UriTooLong)
		assertDeserializeRestoresInstanceOf(UnsupportedMediaType)
		assertDeserializeRestoresInstanceOf(RangeNotSatisfiable)
		assertDeserializeRestoresInstanceOf(ExpectationFailed)
		assertDeserializeRestoresInstanceOf(IAmATeapot)
		assertDeserializeRestoresInstanceOf(MisdirectedRequest)
		assertDeserializeRestoresInstanceOf(UnprocessableEntity)
		assertDeserializeRestoresInstanceOf(Locked)
		assertDeserializeRestoresInstanceOf(FailedDependency)
		assertDeserializeRestoresInstanceOf(TooEarly)
		assertDeserializeRestoresInstanceOf(UpgradeRequired)
		assertDeserializeRestoresInstanceOf(PreconditionRequired)
		assertDeserializeRestoresInstanceOf(TooManyRequests)
		assertDeserializeRestoresInstanceOf(RequestHeaderFieldsTooLarge)
		assertDeserializeRestoresInstanceOf(UnavailableForLegalReasons)
		assertDeserializeRestoresInstanceOf(InternalServerError)
		assertDeserializeRestoresInstanceOf(NotImplemented)
		assertDeserializeRestoresInstanceOf(BadGateway)
		assertDeserializeRestoresInstanceOf(ServiceUnavailable)
		assertDeserializeRestoresInstanceOf(GatewayTimeout)
		assertDeserializeRestoresInstanceOf(HttpVersionNotSupported)
		assertDeserializeRestoresInstanceOf(VariantAlsoNegotiates)
		assertDeserializeRestoresInstanceOf(InsufficientStorage)
		assertDeserializeRestoresInstanceOf(LoopDetected)
		assertDeserializeRestoresInstanceOf(NotExtended)
		assertDeserializeRestoresInstanceOf(NetworkAuthenticationRequired)

		// Base error still works
		assertDeserializeRestoresInstanceOf(IsoError)
	})

	function assertDeserializeRestoresInstanceOf(ErrorClass: new (...args: any[]) => Error) {
		const err = IsoError.deserialize(IsoError.serialize(new ErrorClass('msg')))
		expect(err).toBeInstanceOf(ErrorClass)
		expect(err.message).toEqual('msg')
	}
})

it('returns type string from number', () => {
	const r: { status: number } = { status: 404 }

	if (HttpStatus[r.status]) {
		expect(typeof HttpStatus[r.status]).toBe('string')
	} else {
		throw new Error('should not reach')
	}
})
