export enum Code {
	OK = 0,
	CANCELLED = 1,
	UNKNOWN = 2,
	INVALID_ARGUMENT = 3,
	DEADLINE_EXCEEDED = 4,
	NOT_FOUND = 5,
	ALREADY_EXISTS = 6,
	PERMISSION_DENIED = 7,
	RESOURCE_EXHAUSTED = 8,
	FAILED_PRECONDITION = 9,
	ABORTED = 10,
	OUT_OF_RANGE = 11,
	UNIMPLEMENTED = 12,
	INTERNAL = 13,
	UNAVILABLE = 14,
	DATA_LOSS = 15,
	UNAUTHENTICATED = 16
}

const codeMap: Record<number, string> = {
	0: 'OK',
	1: 'CANCELLED',
	2: 'UNKNOWN',
	3: 'INVALID_ARGUMENT',
	4: 'DEADLINE_EXCEEDED',
	5: 'NOT_FOUND',
	6: 'ALREADY_EXISTS',
	7: 'PERMISSION_DENIED',
	8: 'RESOURCE_EXHAUSTED',
	9: 'FAILED_PRECONDITION',
	10: 'ABORTED',
	11: 'OUT_OF_RANGE',
	12: 'UNIMPLEMENTED',
	13: 'INTERNAL',
	14: 'UNAVILABLE',
	15: 'DATA_LOSS',
	16: 'UNAUTHENTICATED'
}

/**
 * Gets the name of a `google.rpc.Code`
 */
export function codeName(code: number): string {
	return codeMap[code] ?? ''
}

const httpMap: Record<number, number> = {
	0: 200,
	1: 499,
	2: 500,
	3: 400,
	4: 504,
	5: 404,
	6: 409,
	7: 403,
	16: 401,
	8: 429,
	9: 400,
	10: 409,
	11: 400,
	12: 501,
	13: 500,
	14: 503,
	15: 500
}

/**
 * Translate `google.rpc.Code` to HTTP status code
 */
export function codeToHttpStatus(code: number) {
	return httpMap[code] ?? 500
}
