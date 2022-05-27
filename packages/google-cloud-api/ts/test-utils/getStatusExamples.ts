import type { Status } from '../rpc/types.js'

const statusExamples: Status[] = [{
  code: 1,
  message: '',
  details: []
}, {
  code: 2,
  message: '',
  details: []
}, {
  code: 3,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.BadRequest',
    field_violations: [{
      field: 'abc',
      description: 'is wrong'
    }]
  }]
}, {
  code: 4,
  message: '',
  details: []
}, {
  code: 5,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
    resource_name: 'car'
  }]
}, {
  code: 6,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
    resource_name: 'car'
  }]
}, {
  code: 7,
  message: '',
  details: [{
    '@type': 'google-cloud-api/PermissionInfo',
    resource_name: 'car.txt',
    resource_type: 'file',
    permission: 'write'
  }]
}, {
  code: 8,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
    violations: [{
      subject: 'apple',
      description: 'max 100'
    }]
  }]
}, {
  code: 9,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
    violations: [{
      type: 'something',
      subject: 'apple',
      description: 'max 100'
    }]
  }]
}, {
  code: 10,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
    resource_name: 'car'
  }]
}, {
  code: 11,
  message: '',
  details: [{
    '@type': 'type.googleapis.com/google.rpc.BadRequest',
    field_violations: [{
      field: 'abc',
      description: 'is wrong'
    }]
  }]
}, {
  code: 12,
  message: '',
  details: [{
    '@type': 'google-cloud-api/MethodInfo',
    method_name: 'batchGet'
  }]
}, {
  code: 13,
  message: '',
  details: []
}, {
  code: 14,
  message: '',
  details: []
}, {
  code: 15,
  message: '',
  details: []
}, {
  code: 16,
  message: '',
  details: []
}]

export function getStatusExample(code: number) {
  return statusExamples.find(e => e.code === code)
}
