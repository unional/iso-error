import { Aborted, AlreadyExists, Cancelled, DataLoss, FailedPrecondition, InternalError, InvalidArgument, NotFound, OutOfRange, PermissionDenied, ResourceExhausted, Unauthenticated, UnknownError, NotImplemented } from '.';

describe('Cancelled', () => {
  test('create with default message', () => {
    const err = new Cancelled()
    expect(err.message).toEqual('Request cancelled by the client.')
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
        message: 'cancelled, baka'
      }]
    })

    expect(err.details[0]).toEqual({
      '@type': 'type.googleapis.com/google.rpc.LocalizedMessage',
      locale: 'jp',
      message: 'cancelled, baka'
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

describe('OutOfRange', () => {
  test('use field violation description as message', () => {
    const err = new OutOfRange({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.BadRequest',
        field_violations: [{ field: 'age', description: "Parameter 'age' is out of range [0, 125]" }]
      }]
    })
    expect(err.message).toEqual("Parameter 'age' is out of range [0, 125]")
  })

  test('override message', () => {
    const err = new OutOfRange({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.BadRequest',
        field_violations: [{ field: 'age', description: "Parameter 'age' is out of range [0, 125]" }]
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })

  test('multiple field violation description', () => {
    const err = new OutOfRange({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.BadRequest',
        field_violations: [{ field: 'abc', description: 'desc a' }, { field: 'x.y.z', description: 'desc b' }]
      }]
    })
    expect(err.message).toEqual('Multiple out of range violations, please see details.')
  })
})

describe('Unauthenticated', () => {
  test('create with default message', () => {
    const err = new Unauthenticated()
    expect(err.message).toEqual('Invalid authentication credentials.')
  })

  test('override message', () => {
    const err = new Unauthenticated({ message: 'Overridden message' })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('PermissionDenied', () => {
  test('use field violation description as message', () => {
    const err = new PermissionDenied({
      details: [{
        '@type': 'google-cloud-api/PermissionInfo',
        permission: 'read',
        resource_type: 'file',
        resource_name: 'file.txt'
      }]
    })
    expect(err.message).toEqual("Resource 'read' denied on file 'file.txt'.")
  })

  test('override message', () => {
    const err = new PermissionDenied({
      message: 'Overridden message',
      details: [{
        '@type': 'google-cloud-api/PermissionInfo',
        permission: 'read',
        resource_type: 'file',
        resource_name: 'file.txt'
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('NotFound', () => {
  test('use field violation description as message', () => {
    const err = new NotFound({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
        resource_type: 'file',
        resource_name: 'file.txt',
        owner: 'root',
        description: 'some description'
      }]
    })
    expect(err.message).toEqual("Resource 'file.txt' not found.")
  })

  test('override message', () => {
    const err = new NotFound({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
        resource_type: 'file',
        resource_name: 'file.txt',
        owner: 'root',
        description: 'some description'
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('Aborted', () => {
  test('use field violation description as message', () => {
    const err = new Aborted({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
        resource_type: 'file',
        resource_name: 'file.txt',
        owner: 'root',
        description: 'some description'
      }]
    })
    expect(err.message).toEqual("Couldn't acquire lock on resource 'file.txt'.")
  })

  test('override message', () => {
    const err = new Aborted({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
        resource_type: 'file',
        resource_name: 'file.txt',
        owner: 'root',
        description: 'some description'
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('AlreadyExists', () => {
  test('use field violation description as message', () => {
    const err = new AlreadyExists({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
        resource_type: 'file',
        resource_name: 'file.txt',
        owner: 'root',
        description: 'some description'
      }]
    })
    expect(err.message).toEqual("Resource 'file.txt' already exists.")
  })

  test('override message', () => {
    const err = new AlreadyExists({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
        resource_type: 'file',
        resource_name: 'file.txt',
        owner: 'root',
        description: 'some description'
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('ResourceExhausted', () => {
  test('use field violation description as message', () => {
    const err = new ResourceExhausted({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
        violations: [{ subject: 'apple', description: `Quota limit '100' exceeded.` }]
      }]
    })
    expect(err.message).toEqual(`Quota limit '100' exceeded.`)
  })

  test('override message', () => {
    const err = new ResourceExhausted({
      message: 'Overridden message',
      details: [{
        '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
        violations: [{ subject: 'apple', description: `Quota limit '100' exceeded.` }]
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })

  test('multiple field violation description', () => {
    const err = new ResourceExhausted({
      details: [{
        '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
        violations: [
          { subject: 'apple', description: `Quota limit '100' exceeded.` },
          { subject: 'banana', description: `Quota limit '3' exceeded.` },
        ]
      }]
    })
    expect(err.message).toEqual('Multiple quota violations, please see details.')
  })
})

describe('DataLoss', () => {
  test('create with default message', () => {
    const err = new DataLoss()
    expect(err.message).toEqual('')
  })

  test('override message', () => {
    const err = new DataLoss({ message: 'Overridden message' })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('UnknownError', () => {
  test('create with default message', () => {
    const err = new UnknownError()
    expect(err.message).toEqual('')
  })

  test('override message', () => {
    const err = new UnknownError({ message: 'Overridden message' })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('InternalError', () => {
  test('create with default message', () => {
    const err = new InternalError()
    expect(err.message).toEqual('')
  })

  test('override message', () => {
    const err = new InternalError({ message: 'Overridden message' })
    expect(err.message).toEqual('Overridden message')
  })
})

describe('NotImplemented', () => {
  test('use field violation description as message', () => {
    const err = new NotImplemented({
      details: [{
        '@type': 'google-cloud-api/MethodInfo',
        method_name: 'batchGet'
      }]
    })
    expect(err.message).toEqual("Method 'batchGet' not implemented.")
  })

  test('override message', () => {
    const err = new NotImplemented({
      message: 'Overridden message',
      details: [{
        '@type': 'google-cloud-api/MethodInfo',
        method_name: 'batchGet'
      }]
    })
    expect(err.message).toEqual('Overridden message')
  })
})
