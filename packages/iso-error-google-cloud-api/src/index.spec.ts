import a from 'assertron'
import { Cancelled } from 'google-cloud-api'
import { IsoError } from 'iso-error'
import plugin from '.'

beforeAll(() => {
  IsoError.addPlugin(plugin)
})

test('Cancelled', () => {
  const err = new Cancelled()
  const json = IsoError.serialize(err)
  expect(json).toEqual('{"code":1,"message":"Request cancelled by the client.","details":[]}')
  const actual = IsoError.deserialize(json)
  expect(actual).toBeInstanceOf(Cancelled)
  a.satisfies(actual, {
    code: 1,
    message: 'Request cancelled by the client.',
    details: []
  })
})
