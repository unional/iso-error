import { isAggregateError, IsoError, ModuleError } from 'iso-error'
import { isType, required } from 'type-plus'
import { rpc } from './rpc/index.js'

export interface ErrorOptions<D extends rpc.Detail[] = rpc.Detail[]> extends IsoError.Options {
	message?: string
	details?: D
}

export class GoogleCloudApiError<D extends rpc.Detail[] = rpc.Detail[]> extends ModuleError {
	code: number
	details: D
	constructor(options: ErrorOptions<D> & { code: number }) {
		super('google-cloud-api', options.message, options)

		this.code = options.code
		this.details = options?.details || ([] as unknown as D)
	}

	toRpcStatus(): rpc.Status<D> {
		// TODO aggregate debugInfo and causeInfo
		const details = [...(this.details || [])] as unknown as D

		if (this.stack) details.push(this.getDebugInfo())
		details.push(this.getCauseInfo())

		return {
			code: this.code,
			message: this.message,
			details
		}
	}

	private getDebugInfo(): rpc.DebugInfo {
		const stack_entries = this.stack!.split('\n')
			.slice(1)
			.map(s => s.trim().slice(3))
		return {
			'@type': 'type.googleapis.com/google.rpc.DebugInfo',
			stack_entries,
			detail: this.message
		}
	}

	private getCauseInfo(): rpc.CauseInfo {
		return getCauseInfo(this)
	}
}

export function getCauseInfo(error: Error): rpc.CauseInfo {
	return {
		'@type': 'google-cloud-api/CauseInfo',
		...toCauses(error)
	}
}

function toCauses(error: Error): {
	message: string
	module?: string | undefined
	causes?: rpc.CauseInfo.Cause[]
} {
	const message = `${error.name}: ${error.message}`
	const module = error instanceof GoogleCloudApiError ? error.module : undefined
	const cause = error.cause
	if (isType<Error>(cause, s => s instanceof Error)) {
		if (isAggregateError(cause)) {
			return {
				message,
				module,
				causes: cause.errors.map(toCauses)
			}
		}

		return {
			message,
			module,
			causes: [toCauses(cause)]
		}
	}

	return { message }
}

export class Cancelled extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super(required({ message: 'Request cancelled by the client.' }, options, { code: 1 }))
	}
}

export class UnknownError extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super(required({ message: 'Unknown error' }, options, { code: 2 }))
	}
}

export class InvalidArgument<
	D extends [rpc.BadRequest, ...Exclude<rpc.Detail, rpc.BadRequest>[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required(
				{ message: formatBadRequestMessage(options?.details) ?? 'Invalid Argument' },
				options,
				{ code: 3 }
			)
		)
	}
}

function formatBadRequestMessage(details: rpc.Detail[] | undefined) {
	const detail = findDetail<rpc.BadRequest>('type.googleapis.com/google.rpc.BadRequest', details)
	return detail ? extractViolationDescription(detail.field_violations) : undefined
}

function findDetail<D extends rpc.Detail>(
	type: D['@type'],
	details: rpc.Detail[] | undefined
): D | undefined {
	if (!details) return undefined
	return details.find(d => d['@type'] === type) as D | undefined
}

function extractViolationDescription(violations: Array<{ description: string }>) {
	if (violations.length > 1) {
		return 'Multiple violations, please see details.'
	}
	return violations[0]?.description
}

export class DeadlineExceeded extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super(required({ message: 'Deadline Exceeded' }, options, { code: 4 }))
	}
}

export class NotFound<
	D extends [rpc.ResourceInfo, ...rpc.Detail[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required({ message: formatNotFoundMessage(options?.details) ?? 'Not Found' }, options, {
				code: 5
			})
		)
	}
}

function formatNotFoundMessage(details: rpc.Detail[] | undefined) {
	const messages = extractResourceInfoMessages(details)
	return `Resource '${
		messages.length > 1 ? `[${messages.join(', ')}]` : messages.join()
	}' not found.`
}

export class AlreadyExists<
	D extends [rpc.ResourceInfo, ...rpc.Detail[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required(
				{ message: formatAlreadyExistsMessage(options?.details) ?? 'Already Exists' },
				options,
				{ code: 6 }
			)
		)
	}
}

function formatAlreadyExistsMessage(details: rpc.Detail[] | undefined) {
	const messages = extractResourceInfoMessages(details)
	return `Resource '${
		messages.length > 1 ? `[${messages.join(', ')}]` : messages.join()
	}' already exists.`
}

function extractResourceInfoMessages(details: rpc.Detail[] | undefined) {
	if (!details) return []
	const resourceInfos = details.filter(
		d => d['@type'] === 'type.googleapis.com/google.rpc.ResourceInfo'
	) as rpc.ResourceInfo[]

	return resourceInfos.map((d: rpc.ResourceInfo) => formatResourceInfo(d))
}

function formatResourceInfo(d: rpc.ResourceInfo) {
	return `${d.resource_type}: ${d.owner}/${d.resource_name}`
}

export class PermissionDenied extends GoogleCloudApiError {
	constructor(options?: Partial<ErrorOptions>) {
		super(required({ message: getPermissionDeniedMessage(options?.details) }, options, { code: 7 }))
	}
}

function getPermissionDeniedMessage(details: rpc.Detail[] | undefined) {
	if (!details) return ''
	const info = details.find(d => d['@type'] === 'google-cloud-api/PermissionInfo') as
		| rpc.PermissionInfo
		| undefined
	return info ? formatPermissionDeniedMessage(info) : ''
}

function formatPermissionDeniedMessage(permissionInfo: rpc.PermissionInfo) {
	return `Resource '${permissionInfo.permission}' denied on ${permissionInfo.resource_type} '${permissionInfo.resource_name}'.`
}

export class ResourceExhausted<
	D extends [rpc.QuotaFailure, ...rpc.Detail[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required(
				{ message: formatResourceExhaustedMessage(options?.details) ?? 'Resource Exhausted' },
				options,
				{ code: 8 }
			)
		)
	}
}

function formatResourceExhaustedMessage(details: rpc.Detail[] | undefined) {
	const detail = findDetail<rpc.QuotaFailure>(
		'type.googleapis.com/google.rpc.QuotaFailure',
		details
	)
	return detail ? extractViolationDescription(detail.violations) : undefined
}

export class FailedPrecondition<
	D extends [rpc.PreconditionFailure, ...Exclude<rpc.Detail, rpc.PreconditionFailure>[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required(
				{ message: formatPreconditionFailureMessage(options?.details) ?? 'Failed Precondition' },
				options,
				{ code: 9 }
			)
		)
	}
}

function formatPreconditionFailureMessage(details: rpc.Detail[] | undefined) {
	const detail = findDetail<rpc.PreconditionFailure>(
		'type.googleapis.com/google.rpc.PreconditionFailure',
		details
	)
	return detail ? extractViolationDescription(detail.violations) : undefined
}

export class Aborted extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super(
			required({ message: getAbortMessage(options?.details) ?? 'Aborted' }, options, { code: 10 })
		)
	}
}

function getAbortMessage(details: rpc.Detail[] | undefined) {
	const info = findDetail<rpc.ResourceInfo>('type.googleapis.com/google.rpc.ResourceInfo', details)
	return info ? formatAbortMessage(info) : ''
}

function formatAbortMessage(info: rpc.ResourceInfo) {
	return `Couldn't acquire lock on resource '${formatResourceInfo(info)}'.`
}

export class OutOfRange<
	D extends [rpc.BadRequest, ...rpc.Detail[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required({ message: formatBadRequestMessage(options?.details) ?? 'Our of range' }, options, {
				code: 11
			})
		)
	}
}

export class Unimplemented<
	D extends [rpc.MethodInfo, ...rpc.Detail[]]
> extends GoogleCloudApiError<D> {
	constructor(options?: ErrorOptions<D>) {
		super(
			required(
				{ message: formatNotImplementedMessage(options?.details) ?? 'Our of range' },
				options,
				{ code: 11 }
			)
		)
	}
}

function formatNotImplementedMessage(details: rpc.Detail[] | undefined) {
	const info = findDetail<rpc.MethodInfo>('google-cloud-api/MethodInfo', details)!
	return `Method '${info.method_name}' not implemented.`
}

export class InternalError extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super(required({ message: 'Internal Error' }, options, { code: 13 }))
	}
}

export class Unavailable extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super({
			message: 'Unavailable',
			...options,
			code: 14
		})
	}
}

export class DataLoss extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super({
			message: 'Data loss',
			...options,
			code: 15
		})
	}
}

export class Unauthenticated extends GoogleCloudApiError {
	constructor(options?: ErrorOptions) {
		super({
			message: 'Invalid authentication credentials.',
			...options,
			code: 16
		})
	}
}
