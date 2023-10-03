import type { Status } from '../rpc/types.js'

const statusExamples: Status[] = [
	{
		code: 1,
		status: 'CANCELLED',
		message: '',
		details: []
	},
	{
		code: 2,
		status: 'UNKNOWN',
		message: '',
		details: []
	},
	{
		code: 3,
		status: 'INVALID_ARGUMENT',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.BadRequest',
				field_violations: [
					{
						field: 'abc',
						description: 'is wrong'
					}
				]
			}
		]
	},
	{
		code: 4,
		status: 'DEADLINE_EXCEEDED',
		message: '',
		details: []
	},
	{
		code: 5,
		status: 'NOT_FOUND',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.ResourceInfo',
				resource_name: 'car'
			}
		]
	},
	{
		code: 6,
		status: 'ALREADY_EXISTS',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.ResourceInfo',
				resource_name: 'car'
			}
		]
	},
	{
		code: 7,
		status: 'PERMISSION_DENIED',
		message: '',
		details: [
			{
				'@type': 'google-cloud-api/PermissionInfo',
				resource_name: 'car.txt',
				resource_type: 'file',
				permission: 'write'
			}
		]
	},
	{
		code: 8,
		status: 'RESOURCE_EXHAUSTED',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.QuotaFailure',
				violations: [
					{
						subject: 'apple',
						description: 'max 100'
					}
				]
			}
		]
	},
	{
		code: 9,
		status: 'FAILED_PRECONDITION',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
				violations: [
					{
						type: 'something',
						subject: 'apple',
						description: 'max 100'
					}
				]
			}
		]
	},
	{
		code: 10,
		status: 'ABORTED',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.ResourceInfo',
				resource_name: 'car'
			}
		]
	},
	{
		code: 11,
		status: 'OUT_OF_RANGE',
		message: '',
		details: [
			{
				'@type': 'type.googleapis.com/google.rpc.BadRequest',
				field_violations: [
					{
						field: 'abc',
						description: 'is wrong'
					}
				]
			}
		]
	},
	{
		code: 12,
		status: 'UNIMPLEMENTED',
		message: '',
		details: [
			{
				'@type': 'google-cloud-api/MethodInfo',
				method_name: 'batchGet'
			}
		]
	},
	{
		code: 13,
		status: 'INTERNAL',
		message: '',
		details: []
	},
	{
		code: 14,
		status: 'UNAVILABLE',
		message: '',
		details: []
	},
	{
		code: 15,
		status: 'DATA_LOSS',
		message: '',
		details: []
	},
	{
		code: 16,
		status: 'UNAUTHENTICATED',
		message: '',
		details: []
	}
]

export function getStatusExample(code: number) {
	return statusExamples.find(e => e.code === code)
}
