import a from 'assertron'
import { Cancelled } from 'google-cloud-api'
import { IsoError } from 'iso-error'
import plugin from '.'

beforeAll(() => IsoError.addPlugin(plugin))

test('Cancelled', () => {
  const err = new Cancelled()
  const json = IsoError.serialize(err)
  a.satisfies(JSON.parse(json), {
    code: 1,
    message: 'Request cancelled by the client.',
    details: [{
      '@type': 'google-cloud-api/CauseInfo',
      message: 'Cancelled: Request cancelled by the client.'
    }]
  })
  const actual: Cancelled = IsoError.deserialize(json)
  expect(actual).toBeInstanceOf(Cancelled)
  a.satisfies(actual, {
    code: 1,
    message: 'Request cancelled by the client.',
    details: [{
      '@type': 'google-cloud-api/CauseInfo',
      message: 'Cancelled: Request cancelled by the client.'
    }]
  })
})
