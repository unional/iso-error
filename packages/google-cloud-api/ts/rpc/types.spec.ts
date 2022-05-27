import { canAssign } from 'type-plus'
import { rpc } from './index.js'

describe('rpc.Status', () => {
  it('can specify specific detail types', () => {
    const json = {
      code: 200,
      message: 'msg',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.RetryInfo',
        retry_delay: { seconds: 0, nanos: 0 }
      }, {
        '@type': 'type.googleapis.com/google.rpc.DebugInfo',
        stack_entries: [],
        detail: ''
      }, {
        '@type': 'custom',
        description: 'some description'
      }]
    }

    canAssign<rpc.Status>()(json)
  })
})

describe('rpc.CauseInfo', () => {
  it('requires message but causes is optional', () => {
    canAssign<rpc.CauseInfo>()({
      '@type': 'google-cloud-api/CauseInfo',
      message: ''
    })
  })
  it('accepts an array of causes', () => {
    // eventthough `error-cause` turns out to be singular,
    // making `causes` singular creates inconsistent data structure.

    canAssign<rpc.CauseInfo>()({
      '@type': 'google-cloud-api/CauseInfo',
      message: '',
      causes: []
    })
  })
  it('accepts nested causes', () => {
    canAssign<rpc.CauseInfo>()({
      '@type': 'google-cloud-api/CauseInfo',
      message: '',
      causes: [{
        message: '',
        causes: [{ message: '' }]
      }]
    })
  })
})
