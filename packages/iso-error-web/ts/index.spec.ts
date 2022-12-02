import { IsoError } from 'iso-error'
import { AnyConstructor } from 'type-plus'
import webPlugin, { BadGateway, BadRequest, Conflict, createHttpError, Forbidden, GatewayTimeout, Gone, HttpStatus, InternalServerError, MethodNotAllowed, NetworkAuthenticationRequired, NotFound, NotImplemented, PayloadTooLarge, PermanentRedirect, RequestTimeout, ServiceUnavailable, Unauthorized, UnsupportedMediaType } from './index.js'

describe('HttpStatus', () => {
  it('defines Http status code', () => {
    expect(HttpStatus.PermanentRedirect).toBe(308)
    expect(HttpStatus.BadRequest).toBe(400)
    expect(HttpStatus.Unauthorized).toBe(401)
    expect(HttpStatus.Forbidden).toBe(403)
    expect(HttpStatus.NotFound).toBe(404)
    expect(HttpStatus.MethodNotAllowed).toBe(405)
    expect(HttpStatus.RequestTimeout).toBe(408)
    expect(HttpStatus.Conflict).toBe(409)
    expect(HttpStatus.Gone).toBe(410)
    expect(HttpStatus.PayloadTooLarge).toBe(413)
    expect(HttpStatus.UnsupportedMediaType).toBe(415)
    expect(HttpStatus.InternalServerError).toBe(500)
    expect(HttpStatus.NotImplemented).toBe(501)
    expect(HttpStatus.BadGateway).toBe(502)
    expect(HttpStatus.ServiceUnavailable).toBe(503)
    expect(HttpStatus.GatewayTimeout).toBe(504)
    expect(HttpStatus.NetworkAuthenticationRequired).toBe(511)
  })
})

describe('createHttpError()', () => {
  testCreateHttpError(PermanentRedirect, HttpStatus.PermanentRedirect, 'premanent redirected')
  testCreateHttpError(BadRequest, HttpStatus.BadRequest, 'bad request')
  testCreateHttpError(Unauthorized, HttpStatus.Unauthorized, 'not authorized')
  testCreateHttpError(Forbidden, HttpStatus.Forbidden, 'forbidden')
  testCreateHttpError(NotFound, HttpStatus.NotFound, 'value not found')
  testCreateHttpError(MethodNotAllowed, HttpStatus.MethodNotAllowed, 'OPTION method not allowed')
  testCreateHttpError(RequestTimeout, HttpStatus.RequestTimeout, 'request timed out')
  testCreateHttpError(Conflict, HttpStatus.Conflict, 'conflict detected')
  testCreateHttpError(Gone, HttpStatus.Gone, 'entry is gone')
  testCreateHttpError(PayloadTooLarge, HttpStatus.PayloadTooLarge, 'paylog over limit')
  testCreateHttpError(UnsupportedMediaType, HttpStatus.UnsupportedMediaType, 'media type: xml not supported')
  testCreateHttpError(InternalServerError, HttpStatus.InternalServerError, 'internal server error')
  testCreateHttpError(NotImplemented, HttpStatus.NotImplemented, 'not implemented')
  testCreateHttpError(BadGateway, HttpStatus.BadGateway, 'bad gateway')
  testCreateHttpError(ServiceUnavailable, HttpStatus.ServiceUnavailable, 'service unavailable')
  testCreateHttpError(GatewayTimeout, HttpStatus.GatewayTimeout, 'gateway timeout')
  testCreateHttpError(NetworkAuthenticationRequired, HttpStatus.NetworkAuthenticationRequired, 'network auth required')
})

function testCreateHttpError(ErrorClass: AnyConstructor, status: number, message: string) {
  it(`supports ${ErrorClass.name}`, () => assertCreateHttpError(ErrorClass, status, message))
}

function assertCreateHttpError(ErrorClass: AnyConstructor, status: number, message: string) {
  const a = createHttpError(status, message)
  expect(a.name).toBe(ErrorClass.name)
  expect(a).toBeInstanceOf(ErrorClass)
  expect(a.status).toBe(status)
  expect(a.message)
}

describe(`webPlugin`, () => {
  it('restores instanceOf check', () => {
    IsoError.addPlugin(webPlugin)

    assertDeserializeRestoresInstanceOf(PermanentRedirect)
    assertDeserializeRestoresInstanceOf(BadRequest)
    assertDeserializeRestoresInstanceOf(Unauthorized)
    assertDeserializeRestoresInstanceOf(Forbidden)
    assertDeserializeRestoresInstanceOf(NotFound)
    assertDeserializeRestoresInstanceOf(MethodNotAllowed)
    assertDeserializeRestoresInstanceOf(RequestTimeout)
    assertDeserializeRestoresInstanceOf(Conflict)
    assertDeserializeRestoresInstanceOf(Gone)
    assertDeserializeRestoresInstanceOf(PayloadTooLarge)
    assertDeserializeRestoresInstanceOf(UnsupportedMediaType)
    assertDeserializeRestoresInstanceOf(InternalServerError)
    assertDeserializeRestoresInstanceOf(NotImplemented)
    assertDeserializeRestoresInstanceOf(BadGateway)
    assertDeserializeRestoresInstanceOf(ServiceUnavailable)
    assertDeserializeRestoresInstanceOf(GatewayTimeout)
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
