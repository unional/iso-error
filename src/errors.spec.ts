import { Cancelled, InvalidArgument, FailedPrecondition } from './errors';

describe('Cancelled', () => {
  test('create with default message', () => {
    const err = new Cancelled()
    expect(err.message).toEqual('Request cancelled by the client')
    expect(err.details).toEqual([])
  })

  test('override message', () => {
    const err = new Cancelled({ message: 'Overridden message' })
    expect(err.message).toEqual('Overridden message')
  })

  test('specify details', () => {
    const err = new Cancelled({
      message: 'cancelled, haha',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.LocalizedMessage',
        locale: 'jp',
        message: 'canelled, baka'
      }]
    })
    expect(err.details[0]).toEqual({
      '@type': 'type.googleapis.com/google.rpc.LocalizedMessage',
      locale: 'jp',
      message: 'canelled, baka'
    })
  })
})

describe('InvalidArgument', () => {
  test('use field violation description as message', () => {
    const err = new InvalidArgument({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.BadRequest',
        field_violations: [{ field: 'abc', description: 'Request field abc is xyz. It should be abc' }]
      }]
    })
    expect(err.message).toEqual('Request field abc is xyz. It should be abc')
  })

  test('override message', () => {
    const err = new InvalidArgument({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.BadRequest',
        field_violations: [{ field: 'abc', description: 'Request field abc is xyz. It should be abc' }]
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })

  test('multiple field violation description', () => {
    const err = new InvalidArgument({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.BadRequest',
        field_violations: [{ field: 'abc', description: 'desc a' }, { field: 'x.y.z', description: 'desc b' }]
      }]
    })
    expect(err.message).toEqual('Multiple invalid arguments, please see details.')
  })
})

describe('FailedPrecondition', () => {
  test('use field violation description as message', () => {
    const err = new FailedPrecondition({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
        violations: [{ type: 'TOS', subject: 'google.com/cloud', description: 'Terms of service not accepted' }]
      }]
    })
    expect(err.message).toEqual('Terms of service not accepted')
  })

  test('override message', () => {
    const err = new FailedPrecondition({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
        violations: [{ type: 'TOS', subject: 'google.com/cloud', description: 'Terms of service not accepted' }]
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })

  test('multiple violations description', () => {
    const err = new FailedPrecondition({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
        violations: [
          { type: 'TOS', subject: 'google.com/cloud', description: 'Terms of service not accepted' },
          { type: 'TOS', subject: 'google.com/cloud2', description: 'Terms of service not accepted' },
        ]
      }]
    })
    expect(err.message).toEqual('Multiple precondition failures, please see details.')
  })
})
